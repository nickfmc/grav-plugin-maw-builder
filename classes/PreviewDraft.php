<?php

declare(strict_types=1);

namespace Grav\Plugin\MawBuilder;

use Grav\Common\Grav;

/**
 * Short-lived store for unsaved builder drafts, keyed by an unguessable id.
 * Files live in cache://maw-builder/previews so `bin/grav clearcache` wipes them.
 */
class PreviewDraft
{
    public function __construct(private readonly Grav $grav)
    {
    }

    /**
     * @param string|null $route page route, or null for a standalone preview (served at /_maw-preview/<id>)
     * @param array $extra  standalone extras: title, media_folder (absolute path)
     * @return string draft id
     */
    public function put(?string $route, array $blocks, string $field, string $user, array $extra = []): string
    {
        $id = bin2hex(random_bytes(24));
        $ttl = max(60, (int) $this->grav['config']->get('plugins.maw-builder.preview_ttl', 900));
        $this->gc();
        file_put_contents($this->path($id), json_encode([
            'mode' => $route === null ? 'standalone' : 'page',
            'route' => $route ?? '/_maw-preview/' . $id,
            'field' => $field,
            'blocks' => $blocks,
            'user' => $user,
            'expires' => time() + $ttl,
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
        $dir = $this->grav['locator']->findResource('cache://', true, true) . '/maw-builder/previews';
        if (!is_dir($dir)) {
            mkdir($dir, 0775, true);
        }

        return $dir . '/' . $id . '.json';
    }

    /** Remove expired drafts (cheap: runs on write only). */
    private function gc(): void
    {
        $dir = dirname($this->path(str_repeat('0', 48)));
        foreach (glob($dir . '/*.json') ?: [] as $file) {
            if (filemtime($file) < time() - 86400) {
                @unlink($file);
            }
        }
    }
}
