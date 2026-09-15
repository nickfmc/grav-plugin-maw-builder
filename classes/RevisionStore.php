<?php

declare(strict_types=1);

namespace Grav\Plugin\MawBuilder;

use Grav\Common\Grav;

/**
 * Block revisions: a snapshot of a page's / Flex object's / global section's `blocks` taken on every save.
 *
 * Storage: user://data/maw-builder/revisions/<owner-hash>/<timestamp>-<rand>.json
 * (git-ignored: history is per environment, the content itself is what gets committed).
 *
 * Owner keys:  page:/about    flex:case-studies/acme-rebrand    section:footer-cta
 */
class RevisionStore
{
    /** @param string|null $baseDir storage folder override (tests); default user://data/maw-builder/revisions */
    public function __construct(private readonly Grav $grav, private readonly ?string $baseDir = null)
    {
    }

    /**
     * Record a revision unless it's identical to the latest one.
     * @return array|null the stored revision summary, or null when skipped as a duplicate
     */
    public function record(string $owner, array $blocks, string $user = '', string $label = ''): ?array
    {
        $blocks = array_values($blocks);
        $hash = sha1((string) json_encode($blocks));
        $latest = $this->list($owner, 1)[0] ?? null;
        if ($latest && ($latest['hash'] ?? '') === $hash) {
            return null;
        }

        $dir = $this->dir($owner, true);
        $time = microtime(true);
        $id = sprintf('%d-%s', (int) ($time * 1000), bin2hex(random_bytes(3)));
        $data = [
            'id' => $id,
            'owner' => $owner,
            'time' => (int) $time,
            'user' => $user,
            'label' => $label,
            'count' => count($blocks),
            'types' => array_values(array_map(fn ($b) => is_array($b) ? ($b['type'] ?? '?') : '?', $blocks)),
            'hash' => $hash,
            'blocks' => $blocks,
        ];
        Files::write($dir . '/' . $id . '.json', (string) json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
        $this->prune($owner);
        unset($data['blocks']);

        return $data;
    }

    /** @return list<array> newest first, without block payloads */
    public function list(string $owner, int $limit = 0): array
    {
        $dir = $this->dir($owner, false);
        if (!is_dir($dir)) {
            return [];
        }
        $files = glob($dir . '/*.json') ?: [];
        rsort($files, SORT_NATURAL);
        if ($limit > 0) {
            $files = array_slice($files, 0, $limit);
        }
        $out = [];
        foreach ($files as $file) {
            $data = json_decode((string) file_get_contents($file), true);
            if (is_array($data)) {
                unset($data['blocks']);
                $out[] = $data;
            }
        }

        return $out;
    }

    public function get(string $owner, string $id): ?array
    {
        if (!preg_match('/^\d+-[a-f0-9]{6}$/', $id)) {
            return null;
        }
        $file = $this->dir($owner, false) . '/' . $id . '.json';
        $data = is_file($file) ? json_decode((string) file_get_contents($file), true) : null;

        return is_array($data) ? $data : null;
    }

    private function prune(string $owner): void
    {
        $keep = max(5, (int) $this->grav['config']->get('plugins.maw-builder.revisions.keep', 50));
        $files = glob($this->dir($owner, false) . '/*.json') ?: [];
        rsort($files, SORT_NATURAL);
        foreach (array_slice($files, $keep) as $old) {
            @unlink($old);
        }
    }

    private function dir(string $owner, bool $create): string
    {
        $base = $this->baseDir ?? (string) $this->grav['locator']->findResource('user://data', true, $create) . '/maw-builder/revisions';
        $dir = $base . '/' . substr(sha1($owner), 0, 16);
        if ($create && !is_dir($dir)) {
            mkdir($dir, 0775, true);
        }

        return $dir;
    }
}
