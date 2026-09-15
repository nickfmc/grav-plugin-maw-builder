<?php

declare(strict_types=1);

namespace Grav\Plugin\MawBuilder;

/** Copies page/object media files referenced by pasted blocks into the destination's folder. */
final class MediaCopy
{
    public const EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'svg', 'mp4', 'webm', 'pdf'];
    public const MAX_BYTES = 25 * 1024 * 1024;
    public const MAX_FILES = 100;

    /**
     * @param list<mixed> $files bare filenames as stored in block fields
     * @return array{copied: list<string>, skipped: list<string>, missing: list<string>, refused: list<string>}
     */
    public static function copy(string $fromDir, string $toDir, array $files): array
    {
        $result = ['copied' => [], 'skipped' => [], 'missing' => [], 'refused' => []];
        foreach (array_slice(array_values(array_unique(array_map('strval', $files))), 0, self::MAX_FILES) as $name) {
            // Only bare filenames: no folders, streams or URLs.
            if ($name === '' || basename($name) !== $name || str_contains($name, ':') || $name[0] === '.'
                || !in_array(strtolower(pathinfo($name, PATHINFO_EXTENSION)), self::EXTENSIONS, true)) {
                $result['refused'][] = $name;
                continue;
            }
            $source = $fromDir . '/' . $name;
            $target = $toDir . '/' . $name;
            if (!is_file($source) || filesize($source) > self::MAX_BYTES) {
                $result['missing'][] = $name;
            } elseif (file_exists($target)) {
                $result['skipped'][] = $name;
            } elseif (@copy($source, $target)) {
                $result['copied'][] = $name;
                // Grav media metadata (alt text, focal point…) travels with the file when present.
                if (is_file($source . '.meta.yaml') && !file_exists($target . '.meta.yaml')) {
                    @copy($source . '.meta.yaml', $target . '.meta.yaml');
                }
            } else {
                $result['missing'][] = $name;
            }
        }

        return $result;
    }
}
