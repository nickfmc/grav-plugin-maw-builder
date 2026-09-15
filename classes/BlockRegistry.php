<?php

declare(strict_types=1);

namespace Grav\Plugin\MawBuilder;

use Grav\Common\Grav;
use Grav\Common\Yaml;

/**
 * Reads the active theme's block schemas (theme://blueprints/blocks/*.yaml) and returns them as JSON-friendly
 * definitions for the builder UI. Mirrors the resolution rules of user/themes/maw-starter/bin/maw.php:
 * form-level and field-level `import@` are inlined, `_settings.yaml` holds the shared section settings.
 */
class BlockRegistry
{
    /** Field keys passed through to the UI untouched. */
    private const PASS = ['type', 'label', 'title', 'help', 'description', 'placeholder', 'default', 'rows', 'size',
        'min', 'max', 'step', 'accept', 'multiple', 'markdown', 'btnLabel', 'collapsed', 'toggleable',
        // list fields: starter content for items added in the builder
        'new_item'];

    private string $dir;

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

    /** @return array{blocks: list<array>, settings: list<array>, categories: list<string>} */
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
        return array_map(fn ($k) => ltrim((string) $k, '.'), array_keys($this->importFields('blocks/_settings')));
    }

    public function has(string $type): bool
    {
        if ($type === 'global') {
            return true;
        }

        return preg_match('/^[a-z0-9][a-z0-9-]*$/', $type) === 1 && is_file($this->dir . '/blocks/' . $type . '.yaml');
    }

    /** Canonical shape: {type, ...settings, <type>: {content}}. Same rules as maw.php `canonical()`. */
    public function canonical(array $block): array
    {
        $type = $block['type'] ?? null;
        if (!is_string($type) || $type === '') {
            return $block;
        }
        $keys = $this->settingKeys();
        $out = ['type' => $type];
        $flat = [];
        foreach ($block as $key => $value) {
            if ($key === 'type' || $key === $type) {
                continue;
            }
            if (in_array($key, $keys, true)) {
                $out[$key] = $value;
            } else {
                $flat[$key] = $value;
            }
        }
        $out[$type] = is_array($block[$type] ?? null) ? $block[$type] : $flat;

        return $out;
    }

    private function parse(string $file): array
    {
        return Yaml::parse((string) file_get_contents($file)) ?: [];
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
            if (isset($field['validate']['type'])) {
                $item['validate'] = $field['validate']['type'];
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
