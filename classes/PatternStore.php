<?php

declare(strict_types=1);

namespace Grav\Plugin\MawBuilder;

use Grav\Common\Grav;
use Grav\Common\Yaml;

/**
 * Patterns = named lists of blocks. Shipped ones live in the plugin's patterns/ folder (read-only);
 * user-saved ones in user://data/maw-builder/patterns/. To ship a user pattern with the starter,
 * move its YAML file into user/plugins/maw-builder/patterns/.
 */
class PatternStore
{
    public function __construct(private readonly Grav $grav)
    {
    }

    /** @return list<array> */
    public function all(): array
    {
        $patterns = [];
        foreach ([[$this->shippedDir(), 'shipped'], [$this->userDir(false), 'user']] as [$dir, $source]) {
            if (!$dir || !is_dir($dir)) {
                continue;
            }
            foreach (glob($dir . '/*.yaml') ?: [] as $file) {
                $data = Yaml::parse((string) file_get_contents($file)) ?: [];
                if (empty($data['blocks']) || !is_array($data['blocks'])) {
                    continue;
                }
                $patterns[] = [
                    'id' => $source . ':' . basename($file, '.yaml'),
                    'source' => $source,
                    'title' => (string) ($data['title'] ?? basename($file, '.yaml')),
                    'description' => (string) ($data['description'] ?? ''),
                    'category' => ($data['category'] ?? 'section') === 'page' ? 'page' : 'section',
                    'blocks' => array_values($data['blocks']),
                ];
            }
        }

        return $patterns;
    }

    public function save(string $title, string $category, string $description, array $blocks): array
    {
        $slug = trim((string) preg_replace('/[^a-z0-9]+/', '-', strtolower($title)), '-') ?: 'pattern';
        $dir = $this->userDir(true);
        $file = $dir . '/' . $slug . '.yaml';
        for ($i = 2; is_file($file); $i++) {
            $file = $dir . '/' . $slug . '-' . $i . '.yaml';
        }
        $data = ['title' => $title, 'category' => $category === 'page' ? 'page' : 'section',
            'description' => $description, 'blocks' => array_values($blocks)];
        Files::write($file, Yaml::dump($data, 10, 2));

        return ['id' => 'user:' . basename($file, '.yaml'), 'source' => 'user'] + $data;
    }

    public function delete(string $id): bool
    {
        if (!preg_match('/^user:([a-z0-9-]+)$/', $id, $m)) {
            return false;
        }
        $file = $this->userDir(false) . '/' . $m[1] . '.yaml';

        return is_file($file) && unlink($file);
    }

    private function shippedDir(): string
    {
        return dirname(__DIR__) . '/patterns';
    }

    private function userDir(bool $create): string
    {
        $base = (string) $this->grav['locator']->findResource('user://data', true, $create);
        $dir = $base . '/maw-builder/patterns';
        if ($create && !is_dir($dir)) {
            mkdir($dir, 0775, true);
        }

        return $dir;
    }
}
