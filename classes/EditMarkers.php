<?php

declare(strict_types=1);

namespace Grav\Plugin\MawBuilder;

use Twig\Environment;
use Twig\TwigFunction;

/**
 * The inline-editing contract between a theme's templates and the builder's preview.
 *
 * Templates call these Twig functions where a field's value is rendered. Inside a builder preview they emit the
 * `data-maw-*` attributes the preview bridge looks for; on the live site they emit nothing. The functions belong
 * to the plugin so that any theme can adopt the contract by calling them; a theme that must also render without
 * the plugin registers empty stubs for the same names when the plugin has not (see `REGISTERED`).
 *
 *   maw_edit('heading')                       plain single-line text  → data-maw-edit
 *   maw_edit_md('text', inline)               Markdown wrapper        → data-maw-edit-md (+ data-maw-md-inline)
 *   maw_edit_image('image')                   image or its placeholder→ data-maw-edit-image
 *   maw_edit_list('items', 'question')        repeater container      → data-maw-list + data-maw-list-label
 *   maw_edit_item(loop.index0)                one repeater item       → data-maw-item
 *
 * Paths are relative to the block's content ("items.2.title", "buttons.0.label").
 */
final class EditMarkers
{
    /** Container key the plugin sets once the functions are registered, so a theme can skip its stubs. */
    public const REGISTERED = 'maw_edit_markers';

    private const PATH = '/^[a-z0-9_]+(\.[a-z0-9_]+)*$/i';

    /** @param callable(): bool $active true while rendering inside the builder preview */
    public static function register(Environment $env, callable $active): void
    {
        $safe = ['is_safe' => ['html']];
        $attr = static function (string $name, string $path) use ($active): string {
            if (!$active() || !preg_match(self::PATH, $path)) {
                return '';
            }

            return ' ' . $name . '="' . htmlspecialchars($path, ENT_QUOTES) . '"';
        };

        $env->addFunction(new TwigFunction('maw_edit', fn (string $path) => $attr('data-maw-edit', $path), $safe));
        $env->addFunction(new TwigFunction('maw_edit_md', function (string $path, bool $inline = false) use ($attr) {
            $a = $attr('data-maw-edit-md', $path);

            return $a === '' ? '' : $a . ($inline ? ' data-maw-md-inline="1"' : '');
        }, $safe));
        $env->addFunction(new TwigFunction('maw_edit_image', fn (string $path) => $attr('data-maw-edit-image', $path), $safe));
        $env->addFunction(new TwigFunction('maw_edit_list', function (string $path, string $label = 'item') use ($attr) {
            $a = $attr('data-maw-list', $path);

            return $a === '' ? '' : $a . ' data-maw-list-label="' . htmlspecialchars($label, ENT_QUOTES) . '"';
        }, $safe));
        $env->addFunction(new TwigFunction('maw_edit_item', function (int|string $index) use ($active) {
            if (!$active() || !ctype_digit((string) $index)) {
                return '';
            }

            return ' data-maw-item="' . (int) $index . '"';
        }, $safe));
    }
}
