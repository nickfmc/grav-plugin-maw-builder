<?php

declare(strict_types=1);

namespace Grav\Plugin\MawBuilder\Controllers;

use Grav\Plugin\Api\Auth\JwtAuthenticator;
use Grav\Plugin\Api\Controllers\AbstractApiController;
use Grav\Plugin\Api\Exceptions\NotFoundException;
use Grav\Plugin\Api\Exceptions\ValidationException;
use Grav\Plugin\Api\Response\ApiResponse;
use Grav\Plugin\MawBuilder\BlockRegistry;
use Grav\Plugin\MawBuilder\PatternStore;
use Grav\Plugin\MawBuilder\PreviewDraft;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

/**
 * /api/v1/maw-builder/* — every endpoint requires page write permission (the builder only edits pages).
 */
class BuilderController extends AbstractApiController
{
    private const PERMISSION = 'api.pages.write';

    /** GET /maw-builder/blocks */
    public function blocks(ServerRequestInterface $request): ResponseInterface
    {
        $this->requirePermission($request, self::PERMISSION);
        $registry = new BlockRegistry($this->grav);
        if (!$registry->available()) {
            throw new NotFoundException('The active theme has no blueprints/blocks folder.');
        }

        $catalog = $registry->catalog();
        $catalog['devices'] = [
            'tablet' => (int) $this->config->get('plugins.maw-builder.devices.tablet', 820),
            'mobile' => (int) $this->config->get('plugins.maw-builder.devices.mobile', 390),
        ];
        $catalog['theme'] = (string) $this->config->get('system.pages.theme');

        return ApiResponse::create($catalog);
    }

    /** GET /maw-builder/patterns */
    public function patterns(ServerRequestInterface $request): ResponseInterface
    {
        $this->requirePermission($request, self::PERMISSION);

        return ApiResponse::create((new PatternStore($this->grav))->all());
    }

    /** POST /maw-builder/patterns  {title, category, description, blocks} */
    public function savePattern(ServerRequestInterface $request): ResponseInterface
    {
        $this->requirePermission($request, self::PERMISSION);
        $body = $this->getRequestBody($request);
        $title = trim((string) ($body['title'] ?? ''));
        if ($title === '') {
            throw new ValidationException('A pattern needs a title.');
        }
        $blocks = $this->validBlocks($body['blocks'] ?? null);

        $pattern = (new PatternStore($this->grav))->save(
            mb_substr($title, 0, 80),
            (string) ($body['category'] ?? 'section'),
            mb_substr(trim((string) ($body['description'] ?? '')), 0, 200),
            $blocks
        );

        return ApiResponse::create($pattern, 201);
    }

    /** DELETE /maw-builder/patterns/{id} */
    public function deletePattern(ServerRequestInterface $request): ResponseInterface
    {
        $this->requirePermission($request, self::PERMISSION);
        $id = (string) $this->getRouteParam($request, 'id');
        if (!(new PatternStore($this->grav))->delete(urldecode($id))) {
            throw new NotFoundException('Pattern not found (shipped patterns cannot be deleted).');
        }

        return ApiResponse::noContent();
    }

    /**
     * POST /maw-builder/preview  {route, blocks, field?}
     * Stores an unsaved draft and returns a same-origin front-end URL that renders it.
     */
    public function preview(ServerRequestInterface $request): ResponseInterface
    {
        $body = $this->getRequestBody($request);
        $field = in_array($body['field'] ?? 'blocks', ['blocks', 'blocks_after'], true) ? (string) ($body['field'] ?? 'blocks') : 'blocks';

        if (($body['context'] ?? 'page') === 'flex') {
            return $this->flexPreview($request, $body, $field);
        }

        $this->requirePermission($request, self::PERMISSION);
        $route = '/' . trim((string) ($body['route'] ?? ''), '/');
        $blocks = $this->validBlocks($body['blocks'] ?? null);

        $pages = $this->grav['pages'];
        $pages->enablePages();
        $page = $pages->find($route === '/' ? $this->homeRoute() : $route);
        if (!$page) {
            throw new NotFoundException("Page not found at route: {$route}");
        }

        $user = $this->getUser($request);
        $id = (new PreviewDraft($this->grav))->put((string) $page->route(), $blocks, $field, (string) $user->username);

        // Unpublished pages 404 on the front end; reuse the API's route-scoped preview token to unlock them.
        $query = ['maw_preview' => $id, 'admin_preview' => 1];
        if (!$page->published() && $this->config->get('plugins.api.allow_draft_preview', true)) {
            $jwt = new JwtAuthenticator($this->grav, $this->config);
            $query['preview_token'] = $jwt->generatePreviewToken($user, $page->route(), 300);
        }

        return ApiResponse::create([
            'id' => $id,
            'url' => $page->url() . '?' . http_build_query($query),
            'route' => $page->route(),
        ]);
    }

    /**
     * Flex object preview: {context: 'flex', type, key, blocks}. Requires update permission on the object,
     * renders the blocks on a standalone virtual page that resolves images from the object's media folder.
     */
    private function flexPreview(ServerRequestInterface $request, array $body, string $field): ResponseInterface
    {
        $this->requirePermission($request, 'api.access');
        $type = preg_replace('/[^a-z0-9_-]/i', '', (string) ($body['type'] ?? ''));
        $key = (string) ($body['key'] ?? '');

        $flex = $this->grav['flex_objects'] ?? $this->grav['flex'] ?? null;
        $directory = $flex && $type ? $flex->getDirectory($type) : null;
        if (!$directory || !$directory->isEnabled()) {
            throw new NotFoundException("Flex directory '{$type}' not found.");
        }

        $user = $this->getUser($request);
        $object = $key !== '' ? $directory->getObject($key) : null;
        if ($key !== '' && !$object) {
            throw new NotFoundException("Object '{$key}' not found in '{$type}'.");
        }

        // Same rules as the Flex Objects API: super admins (api.super) pass; others need <prefix>.update|create
        // from the directory's `admin.permissions` (api.* or legacy admin.*). Flex's own isAuthorized() can't be
        // used here: with an explicit user it applies a 'test' scope and always fails in API context.
        $action = $object ? 'update' : 'create';
        $allowed = $this->isSuperAdmin($user);
        if (!$allowed && class_exists(\Grav\Plugin\FlexObjects\Api\DirectoryPermission::class)) {
            $allowed = \Grav\Plugin\FlexObjects\Api\DirectoryPermission::isAuthorized($directory, $action, $user, $this->getPermissionResolver());
        }
        if (!$allowed) {
            throw new \Grav\Plugin\Api\Exceptions\ForbiddenException("You don't have permission to {$action} {$directory->getTitle()}.");
        }

        $blocks = $this->validBlocks($body['blocks'] ?? null);

        $extra = [
            'flex' => $object ? ['type' => $type, 'key' => (string) $object->getKey()] : null,
        ];
        $extra['title'] = $object
            ? (string) ($object->getProperty('title') ?? $object->getProperty('name') ?? $directory->getTitle())
            : $directory->getTitle();
        if ($object && method_exists($object, 'getMediaFolder') && ($folder = $object->getMediaFolder())) {
            $locator = $this->grav['locator'];
            $resolved = $locator->isStream($folder) ? $locator->findResource($folder, true, true) : $folder;
            if ($resolved && is_dir($resolved)) {
                $extra['media_folder'] = $resolved;
            }
        }

        $id = (new PreviewDraft($this->grav))->put(null, $blocks, $field, (string) $user->username, $extra);
        $base = rtrim((string) $this->grav['uri']->rootUrl(false), '/');

        return ApiResponse::create([
            'id' => $id,
            'url' => $base . '/_maw-preview/' . $id . '?admin_preview=1',
            'route' => null,
        ]);
    }

    private function validBlocks(mixed $blocks): array
    {
        if (!is_array($blocks) || !array_is_list($blocks)) {
            throw new ValidationException('`blocks` must be a list.');
        }
        $maxKb = (int) $this->config->get('plugins.maw-builder.max_payload_kb', 512);
        if (strlen((string) json_encode($blocks)) > $maxKb * 1024) {
            throw new ValidationException("Blocks payload exceeds {$maxKb} KB.");
        }
        $registry = new BlockRegistry($this->grav);
        $out = [];
        foreach ($blocks as $block) {
            if (!is_array($block) || !is_string($block['type'] ?? null) || !$registry->has($block['type'])) {
                continue;
            }
            $out[] = $registry->canonical($block);
        }

        return $out;
    }

    private function homeRoute(): string
    {
        return '/' . trim((string) $this->config->get('system.home.alias', '/home'), '/');
    }
}
