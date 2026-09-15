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
 * Every write bumps `rev`; update() refuses a stale `rev` so two editors can't silently overwrite each other.
 */
class SectionStore
{
    /** @var array<string, array|null> request-level cache for rendering */
    private static array $cache = [];

    /** @param string|null $baseDir storage folder override (tests); default user://data/maw-builder/sections */
    public function __construct(private readonly Grav $grav, private readonly ?string $baseDir = null)
    {
    }

    /** Forget the request-level cache (tests, long-running CLI). */
    public static function flushCache(): void
    {
        self::$cache = [];
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

        return $this->locked(function () use ($base, $title, $blocks, $user) {
            $id = $base;
            for ($i = 2; is_file($this->dir(true) . '/' . $id . '.yaml'); $i++) {
                $id = $base . '-' . $i;
            }

            return $this->write($id, $title, $blocks, $user, null, 0);
        });
    }

    /**
     * @param int|null $baseRev the `rev` the editor started from; null skips the check (force)
     * @throws SectionConflict when the section was saved by someone else since $baseRev
     */
    public function update(string $id, ?string $title, ?array $blocks, string $user, ?int $baseRev = null): ?array
    {
        return $this->locked(function () use ($id, $title, $blocks, $user, $baseRev) {
            unset(self::$cache[$id]);
            $current = $this->get($id);
            if (!$current) {
                return null;
            }
            if ($baseRev !== null && $baseRev !== $current['rev']) {
                throw new SectionConflict($current);
            }

            return $this->write($id, $title ?? $current['title'], $blocks ?? $current['blocks'], $user, $current['created'] ?: null, $current['rev']);
        });
    }

    public function delete(string $id): bool
    {
        if (!self::validId($id)) {
            return false;
        }
        unset(self::$cache[$id]);
        $file = $this->dir(false) . '/' . $id . '.yaml';

        return is_file($file) && unlink($file);
    }

    /**
     * Where a section is used: pages' and folder-stored Flex objects' `blocks` / `blocks_after` lists
     * containing `{type: global, global: {section: <id>}}`.
     * @param array<string, string>|null $roots {page: dir, flex: dir} override (tests)
     * @return list<string> human-readable locations
     */
    public function usage(string $id, ?array $roots = null): array
    {
        $locator = $this->grav['locator'];
        $roots = array_filter($roots ?? [
            'page' => $locator->findResource('page://', true),
            'flex' => $locator->findResource('user://flex', true),
        ]);
        $found = [];
        foreach ($roots as $kind => $root) {
            $it = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($root, \FilesystemIterator::SKIP_DOTS));
            foreach ($it as $file) {
                if (!in_array($file->getExtension(), ['md', 'yaml'], true) || $file->getSize() > 2_000_000) {
                    continue;
                }
                $raw = (string) file_get_contents($file->getPathname());
                // Cheap pre-filter before parsing YAML.
                if (!str_contains($raw, $id) || !str_contains($raw, 'global')) {
                    continue;
                }
                $data = self::parseFile($raw, $file->getExtension());
                if (self::listUses($data['blocks'] ?? null, $id) || self::listUses($data['blocks_after'] ?? null, $id)) {
                    $rel = str_replace('\\', '/', substr($file->getPath(), strlen($root) + 1));
                    $found[] = ($kind === 'page' ? 'Page: ' : 'Flex: ') . ($rel ?: '/');
                }
            }
        }

        return $found;
    }

    /** Frontmatter of a page file, or the whole document of a YAML file. */
    public static function parseFile(string $raw, string $extension): array
    {
        if ($extension === 'md') {
            if (!preg_match('/^\s*---\R(.*?)\R---/s', $raw, $m)) {
                return [];
            }
            $raw = $m[1];
        }
        try {
            $data = Yaml::parse($raw);
        } catch (\Throwable) {
            return [];
        }

        return is_array($data) ? $data : [];
    }

    public static function listUses(mixed $blocks, string $id): bool
    {
        if (!is_array($blocks)) {
            return false;
        }
        foreach ($blocks as $block) {
            if (is_array($block) && ($block['type'] ?? null) === 'global'
                && (string) ($block['global']['section'] ?? $block['section'] ?? '') === $id) {
                return true;
            }
        }

        return false;
    }

    private function write(string $id, string $title, array $blocks, string $user, ?int $created, int $rev): array
    {
        $data = [
            'id' => $id,
            'title' => $title,
            'rev' => $rev + 1,
            'created' => $created ?? time(),
            'updated' => time(),
            'updated_by' => $user,
            'blocks' => array_values($blocks),
        ];
        Files::write($this->dir(true) . '/' . $id . '.yaml', Yaml::dump($data, 10, 2));
        $data['count'] = count($data['blocks']);
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
            'rev' => (int) ($data['rev'] ?? 1),
            'created' => (int) ($data['created'] ?? 0),
            'updated' => (int) ($data['updated'] ?? filemtime($file)),
            'updated_by' => (string) ($data['updated_by'] ?? ''),
            'count' => is_array($data['blocks'] ?? null) ? count($data['blocks']) : 0,
            'blocks' => is_array($data['blocks'] ?? null) ? array_values($data['blocks']) : [],
        ];
    }

    /** Serialize read-check-write sequences across requests. */
    private function locked(callable $fn): mixed
    {
        $lock = fopen($this->dir(true) . '/.lock', 'c');
        try {
            if ($lock) {
                flock($lock, LOCK_EX);
            }

            return $fn();
        } finally {
            if ($lock) {
                flock($lock, LOCK_UN);
                fclose($lock);
            }
        }
    }

    private function dir(bool $create): string
    {
        $dir = $this->baseDir ?? (string) $this->grav['locator']->findResource('user://data', true, $create) . '/maw-builder/sections';
        if ($create && !is_dir($dir)) {
            mkdir($dir, 0775, true);
        }

        return $dir;
    }
}
