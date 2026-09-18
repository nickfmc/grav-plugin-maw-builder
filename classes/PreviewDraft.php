<?php

declare(strict_types=1);

namespace Grav\Plugin\MawBuilder;

use Grav\Common\Grav;

/**
 * Short-lived store for unsaved builder drafts, keyed by an unguessable id.
 *
 * A draft id is a bearer capability: whoever holds it can render that draft until it expires. The id is 192
 * random bits, the lifetime is `preview_ttl` seconds, and preview responses send `Referrer-Policy: no-referrer`
 * so the id does not leak to third-party assets the page loads.
 *
 * Files live in cache://maw-builder/previews so `bin/grav clearcache` wipes them.
 */
class PreviewDraft
{
    public function __construct(private readonly Grav $grav, private readonly ?string $baseDir = null)
    {
    }

    public function ttl(): int
    {
        return max(60, (int) $this->grav['config']->get('plugins.maw-builder.preview_ttl', 900));
    }

    /**
     * @param string|null $route page route, or null for a standalone preview (served at /_maw-preview/<id>)
     * @param array $extra  standalone extras: title, media_folder (absolute path), flex {type, key}
     * @return string draft id
     */
    public function put(?string $route, array $blocks, string $field, string $user, array $extra = []): string
    {
        $id = bin2hex(random_bytes(24));
        $this->gc();
        file_put_contents($this->path($id), json_encode([
            'mode' => $route === null ? 'standalone' : 'page',
            'route' => $route ?? '/_maw-preview/' . $id,
            'field' => $field,
            'blocks' => $blocks,
            'user' => $user,
            'expires' => time() + $this->ttl(),
        ] + $extra, JSON_THROW_ON_ERROR));

        return $id;
    }

    public function get(string $id): ?array
    {
        if (!preg_match('/^[a-f0-9]{48}$/', $id)) {
            return null;
        }
        $file = $this->path($id);
        if (!is_file($file)) {
            return null;
        }
        $data = json_decode((string) file_get_contents($file), true);
        if (!is_array($data) || ($data['expires'] ?? 0) < time()) {
            @unlink($file);
            return null;
        }

        return $data;
    }

    private function path(string $id): string
    {
        return $this->dir() . '/' . $id . '.json';
    }

    private function dir(): string
    {
        $dir = $this->baseDir ?? $this->grav['locator']->findResource('cache://', true, true) . '/maw-builder/previews';
        if (!is_dir($dir)) {
            mkdir($dir, 0775, true);
        }

        return $dir;
    }

    /**
     * Remove expired drafts. Runs on every write: an editing session posts a draft per edit burst, so without this
     * the folder grows by hundreds of files an hour. A draft's file time is its creation time, so anything older
     * than the lifetime (plus a minute of slack) has expired.
     */
    private function gc(): void
    {
        $cutoff = time() - $this->ttl() - 60;
        foreach (glob($this->dir() . '/*.json') ?: [] as $file) {
            if (filemtime($file) < $cutoff) {
                @unlink($file);
            }
        }
    }
}
