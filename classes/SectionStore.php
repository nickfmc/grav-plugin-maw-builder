<?php

declare(strict_types=1);

namespace Grav\Plugin\MawBuilder;

use Grav\Common\Grav;
use Grav\Common\Yaml;

/**
 * Global (synced) sections: a named list of blocks stored once and placed on any page with
 *   - type: global
 *     global: { section: <id> }
 *
 * Storage: user://data/maw-builder/sections/<id>.yaml (committed to git: see the repo .gitignore).
 */
class SectionStore
{
    /** @var array<string, array|null> request-level cache for rendering */
    private static array $cache = [];

    public function __construct(private readonly Grav $grav)
    {
    }

    public static function validId(string $id): bool
    {
        return preg_match('/^[a-z0-9][a-z0-9-]{0,62}$/', $id) === 1;
    }

    /** @return list<array> summaries (no blocks) */
    public function all(): array
    {
        $out = [];
        foreach (glob($this->dir(false) . '/*.yaml') ?: [] as $file) {
            $data = $this->read($file);
            if ($data) {
                unset($data['blocks']);
                $out[] = $data;
            }
        }
        usort($out, fn ($a, $b) => strcasecmp($a['title'], $b['title']));

        return $out;
    }

    public function get(string $id): ?array
    {
        if (!self::validId($id)) {
            return null;
        }
        if (!array_key_exists($id, self::$cache)) {
            $file = $this->dir(false) . '/' . $id . '.yaml';
            self::$cache[$id] = is_file($file) ? $this->read($file) : null;
        }

        return self::$cache[$id];
    }

    public function create(string $title, array $blocks, string $user): array
    {
        $base = trim((string) preg_replace('/[^a-z0-9]+/', '-', strtolower($title)), '-') ?: 'section';
        $base = substr($base, 0, 50);
        $id = $base;
        for ($i = 2; is_file($this->dir(true) . '/' . $id . '.yaml'); $i++) {
            $id = $base . '-' . $i;
        }

        return $this->write($id, $title, $blocks, $user);
    }

    public function update(string $id, ?string $title, ?array $blocks, string $user): ?array
    {
        $current = $this->get($id);
        if (!$current) {
            return null;
        }

        return $this->write($id, $title ?? $current['title'], $blocks ?? $current['blocks'], $user, $current['created'] ?? null);
    }

    public function delete(string $id): bool
    {
        $file = $this->dir(false) . '/' . $id . '.yaml';
        unset(self::$cache[$id]);

        return self::validId($id) && is_file($file) && unlink($file);
    }

    /**
     * Where a section is used: scans page files and folder-stored Flex objects for `section: <id>`.
     * @return list<string> human-readable locations
     */
    public function usage(string $id): array
    {
        $locator = $this->grav['locator'];
        $roots = array_filter([
            'page' => $locator->findResource('page://', true),
            'flex' => $locator->findResource('user://flex', true),
        ]);
        $needle = '/section:\s*[\'"]?' . preg_quote($id, '/') . '[\'"]?\s*$/m';
        $found = [];
        foreach ($roots as $kind => $root) {
            $it = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($root, \FilesystemIterator::SKIP_DOTS));
            foreach ($it as $file) {
                if (!in_array($file->getExtension(), ['md', 'yaml'], true) || $file->getSize() > 2_000_000) {
                    continue;
                }
                if (preg_match($needle, (string) file_get_contents($file->getPathname()))) {
                    $rel = str_replace('\\', '/', substr($file->getPath(), strlen($root) + 1));
                    $found[] = ($kind === 'page' ? 'Page: ' : 'Flex: ') . ($rel ?: '/');
                }
            }
        }

        return $found;
    }

    private function write(string $id, string $title, array $blocks, string $user, ?int $created = null): array
    {
        $data = [
            'id' => $id,
            'title' => $title,
            'created' => $created ?? time(),
            'updated' => time(),
            'updated_by' => $user,
            'blocks' => array_values($blocks),
        ];
        file_put_contents($this->dir(true) . '/' . $id . '.yaml', Yaml::dump($data, 10, 2));
        self::$cache[$id] = $data;

        return $data;
    }

    private function read(string $file): ?array
    {
        try {
            $data = Yaml::parse((string) file_get_contents($file)) ?: [];
        } catch (\Throwable) {
            return null;
        }
        $id = basename($file, '.yaml');

        return [
            'id' => $id,
            'title' => (string) ($data['title'] ?? $id),
            'created' => (int) ($data['created'] ?? 0),
            'updated' => (int) ($data['updated'] ?? filemtime($file)),
            'updated_by' => (string) ($data['updated_by'] ?? ''),
            'count' => is_array($data['blocks'] ?? null) ? count($data['blocks']) : 0,
            'blocks' => is_array($data['blocks'] ?? null) ? array_values($data['blocks']) : [],
        ];
    }

    private function dir(bool $create): string
    {
        $base = (string) $this->grav['locator']->findResource('user://data', true, $create);
        $dir = $base . '/maw-builder/sections';
        if ($create && !is_dir($dir)) {
            mkdir($dir, 0775, true);
        }

        return $dir;
    }
}
