<?php

declare(strict_types=1);

namespace Grav\Plugin\MawBuilder;

use Grav\Common\Grav;
use Grav\Common\Yaml;

/**
 * Reads the active theme's block schemas (theme://blueprints/blocks/*.yaml) and returns them as JSON-friendly
 * definitions for the builder UI. Mirrors the resolution rules of the theme's bin/maw.php: form-level and
 * field-level `import@` are inlined, `_settings.yaml` holds the shared section settings.
 *
 * Every file is parsed at most once per instance; build one instance per request.
 */
class BlockRegistry
{
    /** A block type is a folder-safe slug: it names a blueprint and a template file. */
    public const TYPE_PATTERN = '/^[a-z0-9][a-z0-9-]*$/';

    /** Field keys passed through to the UI untouched. */
    private const PASS = ['type', 'label', 'title', 'help', 'description', 'placeholder', 'default', 'rows', 'size',
        'min', 'max', 'step', 'accept', 'multiple', 'markdown', 'btnLabel', 'collapsed', 'toggleable',
        // list fields: starter content for items added in the builder
        'new_item'];

    private string $dir;

    /** @var array<string, array> parsed YAML per file */
    private array $parsed = [];

    /** @var array<string, bool> type → exists */
    private array $known = [];

    /** @var list<string>|null */
    private ?array $settingKeys = null;

    public function __construct(private readonly Grav $grav)
    {
        $this->dir = $this->resolveDir();
    }

    /** theme:// is not always registered (API requests can skip theme init), so fall back to the configured theme folder. */
    private function resolveDir(): string
    {
        $locator = $this->grav['locator'];
        try {
            $dir = $locator->findResource('theme://blueprints', true);
            if ($dir) {
                return (string) $dir;
            }
        } catch (\Throwable) {
        }
        $theme = preg_replace('/[^a-z0-9_-]/i', '', (string) $this->grav['config']->get('system.pages.theme'));
        $dir = $locator->findResource('themes://' . $theme . '/blueprints', true)
            ?: $locator->findResource('user://themes/' . $theme . '/blueprints', true);

        return (string) $dir;
    }

    public function available(): bool
    {
        return $this->dir !== '' && is_dir($this->dir . '/blocks');
    }

    /** @return array{blocks: list<array>, settings: list<array>, settingKeys: list<string>, categories: list<string>} */
    public function catalog(): array
    {
        $blocks = [];
        foreach (glob($this->dir . '/blocks/*.yaml') ?: [] as $file) {
            $type = basename($file, '.yaml');
            if ($type[0] === '_') {
                continue;
            }
            $bp = $this->parse($file);
            $blocks[] = [
                'type' => $type,
                'title' => $bp['title'] ?? ucwords(str_replace('-', ' ', $type)),
                'description' => $bp['description'] ?? '',
                'icon' => $bp['icon'] ?? 'fa-square',
                'category' => $bp['category'] ?? 'content',
                'example' => $bp['example'] ?? null,
                'fields' => $this->normalizeFields($this->blockFields($bp)),
            ];
        }
        usort($blocks, fn ($a, $b) => strcmp($a['title'], $b['title']));

        // Provided by this plugin, not the theme: a reference to a global (synced) section.
        $blocks[] = [
            'type' => 'global',
            'title' => 'Global section',
            'description' => 'A synced section edited once and shown everywhere it is placed.',
            'icon' => 'fa-globe',
            'category' => 'global',
            'virtual' => true,
            'example' => null,
            'fields' => [['name' => 'section', 'type' => 'global-section', 'label' => 'Global section']],
        ];

        $categories = array_values(array_unique(array_column($blocks, 'category')));

        return [
            'blocks' => $blocks,
            'settings' => $this->normalizeFields($this->importFields('blocks/_settings')),
            'settingKeys' => $this->settingKeys(),
            'categories' => $categories,
        ];
    }

    /** @return list<string> */
    public function settingKeys(): array
    {
        return $this->settingKeys ??= array_map(fn ($k) => ltrim((string) $k, '.'), array_keys($this->importFields('blocks/_settings')));
    }

    public function has(string $type): bool
    {
        if ($type === 'global') {
            return true;
        }

        return $this->known[$type] ??= preg_match(self::TYPE_PATTERN, $type) === 1 && is_file($this->dir . '/blocks/' . $type . '.yaml');
    }

    /**
     * Canonical shape: {type, ...settings, <type>: {content}}.
     *
     *  - Shared setting keys stay flat on the block.
     *  - Content sits under the type key.
     *  - A block written flat (no `<type>` map) has its remaining keys moved under the type.
     *  - A block that already has its `<type>` map keeps every other key exactly where it is.
     *
     * Nothing is ever discarded: a key this registry does not recognise may be a setting the theme added after
     * this catalogue was read, or something hand-written that another renderer relies on. The one lossy shape,
     * flat leftovers beside an existing `<type>` map, was the source of silent data loss and is gone.
     */
    public function canonical(array $block): array
    {
        $type = $block['type'] ?? null;
        if (!is_string($type) || $type === '') {
            return $block;
        }
        $nested = $block[$type] ?? null;
        $hasNested = is_array($nested);
        $keys = $this->settingKeys();
        $out = ['type' => $type];
        $flat = [];
        foreach ($block as $key => $value) {
            if ($key === 'type' || $key === $type) {
                continue;
            }
            if ($hasNested || in_array($key, $keys, true)) {
                $out[$key] = $value;
            } else {
                $flat[$key] = $value;
            }
        }
        $out[$type] = $hasNested ? $nested : $flat;

        return $out;
    }

    /**
     * Normalise a list of blocks for storage or preview.
     *
     * Every block keeps its data. Blocks whose type the theme does not define are passed through and reported in
     * `unknown` so the caller can say so; a block without a well-formed `type` cannot be rendered or addressed at
     * all and is reported in `invalid` (as its position) for the caller to refuse.
     *
     * @return array{blocks: list<array>, unknown: list<string>, invalid: list<int>}
     */
    public function normalize(array $blocks): array
    {
        $out = [];
        $unknown = [];
        $invalid = [];
        foreach (array_values($blocks) as $i => $block) {
            $type = is_array($block) ? ($block['type'] ?? null) : null;
            if (!is_string($type) || preg_match(self::TYPE_PATTERN, $type) !== 1) {
                $invalid[] = $i;
                continue;
            }
            if (!$this->has($type) && !in_array($type, $unknown, true)) {
                $unknown[] = $type;
            }
            $out[] = $this->canonical($block);
        }

        return ['blocks' => $out, 'unknown' => $unknown, 'invalid' => $invalid];
    }

    private function parse(string $file): array
    {
        if (!array_key_exists($file, $this->parsed)) {
            try {
                $this->parsed[$file] = Yaml::parse((string) file_get_contents($file)) ?: [];
            } catch (\Throwable $e) {
                $this->grav['log']->warning("maw-builder: cannot parse {$file}: " . $e->getMessage());
                $this->parsed[$file] = [];
            }
        }

        return $this->parsed[$file];
    }

    private function blockFields(array $bp): array
    {
        $fields = $this->inlineImports($bp['form']['fields'] ?? []);
        if (isset($bp['form']['import@']['type'])) {
            $fields += $this->importFields((string) $bp['form']['import@']['type']);
        }

        return $fields;
    }

    private function importFields(string $type): array
    {
        $file = $this->dir . '/' . $type . '.yaml';

        return is_file($file) ? $this->inlineImports($this->parse($file)['form']['fields'] ?? []) : [];
    }

    private function inlineImports(array $fields): array
    {
        $out = [];
        foreach ($fields as $name => $field) {
            if (is_array($field) && isset($field['import@']['type'])) {
                $out += $this->importFields((string) $field['import@']['type']);
                continue;
            }
            $out[$name] = $field;
        }

        return $out;
    }

    /**
     * Blueprint map → ordered list of {name, type, label, options: [{value,label}], fields: [...]}.
     * `validate` is passed as the rule map ({type, min, max, ...}) so controls can read limits from one place.
     */
    private function normalizeFields(array $fields): array
    {
        $out = [];
        foreach ($fields as $name => $field) {
            if (!is_array($field) || in_array($field['type'] ?? '', ['spacer', 'section', 'fieldset'], true)) {
                continue;
            }
            $item = ['name' => ltrim((string) $name, '.')];
            foreach (self::PASS as $key) {
                if (array_key_exists($key, $field)) {
                    $item[$key] = $field[$key];
                }
            }
            if (isset($field['options']) && is_array($field['options'])) {
                $item['options'] = [];
                foreach ($field['options'] as $value => $label) {
                    $item['options'][] = ['value' => (string) $value, 'label' => $this->translate((string) $label)];
                }
            }
            if (isset($field['validate']) && is_array($field['validate'])) {
                $item['validate'] = $field['validate'];
            }
            if (!empty($field['fields']) && is_array($field['fields'])) {
                $item['fields'] = $this->normalizeFields($field['fields']);
            }
            $out[] = $item;
        }

        return $out;
    }

    private function translate(string $label): string
    {
        return match ($label) {
            'PLUGIN_ADMIN.YES' => 'Yes',
            'PLUGIN_ADMIN.NO' => 'No',
            'PLUGIN_ADMIN.ENABLED' => 'Enabled',
            'PLUGIN_ADMIN.DISABLED' => 'Disabled',
            default => $label,
        };
    }
}
