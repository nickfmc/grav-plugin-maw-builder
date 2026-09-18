<?php

declare(strict_types=1);

namespace Grav\Plugin\MawBuilder;

use Grav\Common\Grav;
use Grav\Common\Yaml;

/**
 * Patterns = named lists of blocks. Shipped ones live in the plugin's patterns/ folder (read-only);
 * user-saved ones in user://data/maw-builder/patterns/. To ship a user pattern with the starter,
 * move its YAML file into user/plugins/maw-builder/patterns/.
 *
 * A pattern's id is its file slug (`hero-logos`), unique across both folders. It travels in URL paths, so it
 * must never contain a colon: Grav's URI parser reads a `key:value` path segment as a URL parameter.
 */
class PatternStore
{
    /** @param string|null $userDir storage folder override (tests); default user://data/maw-builder/patterns */
    public function __construct(
        private readonly Grav $grav,
        private readonly ?BlockRegistry $registry = null,
        private readonly ?string $userDir = null,
        private readonly ?string $shippedDir = null,
    ) {
    }

    public static function validId(string $id): bool
    {
        return preg_match('/^[a-z0-9][a-z0-9-]{0,79}$/', $id) === 1;
    }

    /**
     * Every readable pattern. A pattern whose blocks use a type the theme does not define is still listed, with
     * those types in `unknown`, so it can be shown as unusable and, if it is a user pattern, deleted.
     * @return list<array>
     */
    public function all(): array
    {
        $patterns = [];
        $seen = [];
        foreach ([[$this->shipped(), 'shipped'], [$this->user(false), 'user']] as [$dir, $source]) {
            if (!$dir || !is_dir($dir)) {
                continue;
            }
            foreach (glob($dir . '/*.yaml') ?: [] as $file) {
                $id = basename($file, '.yaml');
                if (!self::validId($id)) {
                    continue;
                }
                if (isset($seen[$id])) {
                    $this->grav['log']->warning("maw-builder: user pattern '{$id}' is shadowed by a shipped pattern of the same name.");
                    continue;
                }
                try {
                    $data = Yaml::parse((string) file_get_contents($file)) ?: [];
                } catch (\Throwable $e) {
                    $this->grav['log']->warning("maw-builder: cannot parse pattern {$file}: " . $e->getMessage());
                    continue;
                }
                if (empty($data['blocks']) || !is_array($data['blocks'])) {
                    continue;
                }
                $seen[$id] = true;
                $blocks = array_values($data['blocks']);
                $unknown = [];
                if ($this->registry) {
                    $normalized = $this->registry->normalize($blocks);
                    $blocks = $normalized['blocks'];
                    $unknown = $normalized['unknown'];
                }
                $patterns[] = [
                    'id' => $id,
                    'source' => $source,
                    'title' => (string) ($data['title'] ?? $id),
                    'description' => (string) ($data['description'] ?? ''),
                    'category' => ($data['category'] ?? 'section') === 'page' ? 'page' : 'section',
                    'blocks' => $blocks,
                    'unknown' => $unknown,
                ];
            }
        }

        return $patterns;
    }

    public function save(string $title, string $category, string $description, array $blocks): array
    {
        $slug = trim((string) preg_replace('/[^a-z0-9]+/', '-', strtolower($title)), '-') ?: 'pattern';
        $slug = substr($slug, 0, 60);
        $dir = $this->user(true);
        $id = $slug;
        for ($i = 2; $this->exists($id); $i++) {
            $id = $slug . '-' . $i;
        }
        $data = ['title' => $title, 'category' => $category === 'page' ? 'page' : 'section',
            'description' => $description, 'blocks' => array_values($blocks)];
        Files::write($dir . '/' . $id . '.yaml', Yaml::dump($data, 10, 2));

        return ['id' => $id, 'source' => 'user', 'unknown' => []] + $data;
    }

    /** Only user patterns can be deleted; shipped ones are files in the plugin. */
    public function delete(string $id): bool
    {
        if (!self::validId($id)) {
            return false;
        }
        $file = $this->user(false) . '/' . $id . '.yaml';

        return is_file($file) && unlink($file);
    }

    private function exists(string $id): bool
    {
        return is_file($this->user(false) . '/' . $id . '.yaml') || is_file($this->shipped() . '/' . $id . '.yaml');
    }

    private function shipped(): string
    {
        return $this->shippedDir ?? dirname(__DIR__) . '/patterns';
    }

    private function user(bool $create): string
    {
        $dir = $this->userDir ?? (string) $this->grav['locator']->findResource('user://data', true, $create) . '/maw-builder/patterns';
        if ($create && !is_dir($dir)) {
            mkdir($dir, 0775, true);
        }

        return $dir;
    }
}
