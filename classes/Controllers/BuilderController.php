<?php

declare(strict_types=1);

namespace Grav\Plugin\MawBuilder\Controllers;

use Grav\Common\Page\Interfaces\PageInterface;
use Grav\Plugin\Api\Auth\JwtAuthenticator;
use Grav\Plugin\Api\Controllers\AbstractApiController;
use Grav\Plugin\Api\Exceptions\ConflictException;
use Grav\Plugin\Api\Exceptions\ForbiddenException;
use Grav\Plugin\Api\Exceptions\NotFoundException;
use Grav\Plugin\Api\Exceptions\ValidationException;
use Grav\Plugin\Api\Response\ApiResponse;
use Grav\Plugin\MawBuilder\BlockRegistry;
use Grav\Plugin\MawBuilder\MediaCopy;
use Grav\Plugin\MawBuilder\PatternStore;
use Grav\Plugin\MawBuilder\PresenceStore;
use Grav\Plugin\MawBuilder\PreviewDraft;
use Grav\Plugin\MawBuilder\RevisionStore;
use Grav\Plugin\MawBuilder\SectionConflict;
use Grav\Plugin\MawBuilder\SectionStore;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

/**
 * /api/v1/maw-builder/*
 *
 * Every endpoint that touches a specific page / Flex object / global section goes through resolveOwner(),
 * which applies the same permission rules the builder's save path would face.
 */
class BuilderController extends AbstractApiController
{
    private const PERMISSION = 'api.pages.write';

    /* ================================================================ catalogue & patterns */

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
        $pattern = (new PatternStore($this->grav))->save(
            mb_substr($title, 0, 80),
            (string) ($body['category'] ?? 'section'),
            mb_substr(trim((string) ($body['description'] ?? '')), 0, 200),
            $this->validBlocks($body['blocks'] ?? null)
        );

        return ApiResponse::create($pattern, 201);
    }

    /** DELETE /maw-builder/patterns/{id} */
    public function deletePattern(ServerRequestInterface $request): ResponseInterface
    {
        $this->requirePermission($request, self::PERMISSION);
        $id = urldecode((string) $this->getRouteParam($request, 'id'));
        if (!(new PatternStore($this->grav))->delete($id)) {
            throw new NotFoundException('Pattern not found (shipped patterns cannot be deleted).');
        }

        return ApiResponse::noContent();
    }

    /* ================================================================ preview */

    /**
     * POST /maw-builder/preview
     *   page:    {route, blocks, field?}
     *   flex:    {context:'flex', type, key, blocks}
     *   section: {context:'section', id, blocks}
     */
    public function preview(ServerRequestInterface $request): ResponseInterface
    {
        $body = $this->getRequestBody($request);
        $field = in_array($body['field'] ?? 'blocks', ['blocks', 'blocks_after'], true) ? (string) ($body['field'] ?? 'blocks') : 'blocks';
        $owner = $this->resolveOwner($request, $body);
        $blocks = $this->validBlocks($body['blocks'] ?? null);
        $user = $this->getUser($request);
        $drafts = new PreviewDraft($this->grav);

        if ($owner['kind'] === 'page') {
            /** @var PageInterface $page */
            $page = $owner['page'];
            $id = $drafts->put((string) $page->route(), $blocks, $field, (string) $user->username);

            // Unpublished pages 404 on the front end; reuse the API's route-scoped preview token to unlock them.
            $query = ['maw_preview' => $id, 'admin_preview' => 1];
            if (!$page->published() && $this->config->get('plugins.api.allow_draft_preview', true)) {
                $jwt = new JwtAuthenticator($this->grav, $this->config);
                $query['preview_token'] = $jwt->generatePreviewToken($user, $page->route(), 300);
            }

            return ApiResponse::create(['id' => $id, 'url' => $page->url() . '?' . http_build_query($query), 'route' => $page->route()]);
        }

        $extra = ['title' => $owner['title']];
        if ($owner['kind'] === 'flex') {
            $extra['flex'] = ['type' => $owner['type'], 'key' => $owner['key']];
            if ($owner['media_folder']) {
                $extra['media_folder'] = $owner['media_folder'];
            }
        }
        $id = $drafts->put(null, $blocks, $field, (string) $user->username, $extra);
        $base = rtrim((string) $this->grav['uri']->rootUrl(false), '/');

        return ApiResponse::create(['id' => $id, 'url' => $base . '/_maw-preview/' . $id . '?admin_preview=1', 'route' => null]);
    }

    /* ================================================================ revisions */

    /**
     * GET /maw-builder/revisions?context=page&route=/about | context=flex&type=&key= | context=section&id=
     * When nothing has been recorded yet, the currently saved blocks are stored as the first revision.
     */
    public function revisions(ServerRequestInterface $request): ResponseInterface
    {
        $owner = $this->resolveOwner($request, $request->getQueryParams());
        $store = new RevisionStore($this->grav);
        $list = $store->list($owner['owner']);
        if (!$list && $owner['saved']) {
            $store->record($owner['owner'], $owner['saved'], '', 'Saved before history started');
            $list = $store->list($owner['owner']);
        }

        return ApiResponse::create(['owner' => $owner['owner'], 'items' => $list]);
    }

    /** GET /maw-builder/revisions/{id}?<owner params> → one revision including its blocks */
    public function revision(ServerRequestInterface $request): ResponseInterface
    {
        $owner = $this->resolveOwner($request, $request->getQueryParams());
        $revision = (new RevisionStore($this->grav))->get($owner['owner'], (string) $this->getRouteParam($request, 'id'));
        if (!$revision) {
            throw new NotFoundException('Revision not found.');
        }

        return ApiResponse::create($revision);
    }

    /* ================================================================ global sections */

    /** GET /maw-builder/sections */
    public function sections(ServerRequestInterface $request): ResponseInterface
    {
        $this->requirePermission($request, self::PERMISSION);

        return ApiResponse::create((new SectionStore($this->grav))->all());
    }

    /** POST /maw-builder/sections  {title, blocks} */
    public function createSection(ServerRequestInterface $request): ResponseInterface
    {
        $this->requirePermission($request, self::PERMISSION);
        $body = $this->getRequestBody($request);
        $title = trim((string) ($body['title'] ?? ''));
        if ($title === '') {
            throw new ValidationException('A global section needs a name.');
        }
        $blocks = array_values(array_filter($this->validBlocks($body['blocks'] ?? null), fn ($b) => $b['type'] !== 'global'));
        if (!$blocks) {
            throw new ValidationException('A global section needs at least one block.');
        }
        $user = (string) $this->getUser($request)->username;
        $section = (new SectionStore($this->grav))->create(mb_substr($title, 0, 80), $blocks, $user);
        (new RevisionStore($this->grav))->record('section:' . $section['id'], $section['blocks'], $user, 'Created');
        $this->sectionChanged($section['id'], 'create');

        return ApiResponse::create($section, 201);
    }

    /** GET /maw-builder/sections/{id} → section with blocks and usage */
    public function section(ServerRequestInterface $request): ResponseInterface
    {
        $this->requirePermission($request, self::PERMISSION);
        $store = new SectionStore($this->grav);
        $id = (string) $this->getRouteParam($request, 'id');
        $section = $store->get($id);
        if (!$section) {
            throw new NotFoundException("Global section '{$id}' not found.");
        }
        $section['usage'] = $store->usage($id);

        return ApiResponse::create($section);
    }

    /**
     * PATCH /maw-builder/sections/{id}  {title?, blocks?, base_rev?}
     * With `base_rev`, a section saved by someone else in the meantime is refused with 409 unless ?force=1.
     */
    public function updateSection(ServerRequestInterface $request): ResponseInterface
    {
        $this->requirePermission($request, self::PERMISSION);
        $id = (string) $this->getRouteParam($request, 'id');
        $body = $this->getRequestBody($request);
        $blocks = array_key_exists('blocks', $body)
            ? array_values(array_filter($this->validBlocks($body['blocks']), fn ($b) => $b['type'] !== 'global'))
            : null;
        $title = isset($body['title']) ? mb_substr(trim((string) $body['title']), 0, 80) : null;
        $user = (string) $this->getUser($request)->username;
        $force = !empty($request->getQueryParams()['force']);
        $baseRev = !$force && isset($body['base_rev']) && is_numeric($body['base_rev']) ? (int) $body['base_rev'] : null;

        try {
            $section = (new SectionStore($this->grav))->update($id, $title ?: null, $blocks, $user, $baseRev);
        } catch (SectionConflict $e) {
            throw new ConflictException($e->getMessage());
        }
        if (!$section) {
            throw new NotFoundException("Global section '{$id}' not found.");
        }
        (new RevisionStore($this->grav))->record('section:' . $id, $section['blocks'], $user);
        $this->sectionChanged($id, 'update');

        return ApiResponse::create($section);
    }

    /** DELETE /maw-builder/sections/{id}  (refused while the section is still placed somewhere, unless ?force=1) */
    public function deleteSection(ServerRequestInterface $request): ResponseInterface
    {
        $this->requirePermission($request, self::PERMISSION);
        $store = new SectionStore($this->grav);
        $id = (string) $this->getRouteParam($request, 'id');
        $usage = $store->usage($id);
        if ($usage && empty($request->getQueryParams()['force'])) {
            throw new ValidationException('This section is still used on: ' . implode(', ', $usage));
        }
        if (!$store->delete($id)) {
            throw new NotFoundException("Global section '{$id}' not found.");
        }
        $this->sectionChanged($id, 'delete');

        return ApiResponse::noContent();
    }

    /* ================================================================ save state */

    /**
     * POST /maw-builder/state  {<owner params>, blocks?}
     * → {modified, matches, saved_by}. The builder polls this after triggering Admin2's save to confirm the
     * blocks it sent are really on disk (a failed validation or expired session never changes the file).
     */
    public function state(ServerRequestInterface $request): ResponseInterface
    {
        $body = $this->getRequestBody($request);
        $owner = $this->resolveOwner($request, $body);
        $matches = null;
        if (array_key_exists('blocks', $body)) {
            $matches = self::comparable($this->validBlocks($owner['saved'])) === self::comparable($this->validBlocks($body['blocks']));
        }
        $latest = (new RevisionStore($this->grav))->list($owner['owner'], 1)[0] ?? null;

        return ApiResponse::create([
            'owner' => $owner['owner'],
            'modified' => $owner['modified'],
            'matches' => $matches,
            'saved_by' => $latest['user'] ?? '',
        ]);
    }

    /* ================================================================ presence */

    /**
     * POST /maw-builder/presence  {<owner params>, session, editing}
     * Heartbeat for "who else has this open". → {you, editors: [other sessions], modified, saved_by}
     */
    public function presence(ServerRequestInterface $request): ResponseInterface
    {
        $body = $this->getRequestBody($request);
        $owner = $this->resolveOwner($request, $body);
        $session = (string) ($body['session'] ?? '');
        if (!PresenceStore::validSession($session)) {
            throw new ValidationException('Invalid presence session id.');
        }
        $user = $this->getUser($request);
        $username = (string) $user->username;
        $others = (new PresenceStore($this->grav))->touch(
            $owner['owner'],
            $session,
            $username,
            (string) ($user->fullname ?: $username),
            !empty($body['editing'])
        );
        $latest = (new RevisionStore($this->grav))->list($owner['owner'], 1)[0] ?? null;

        return ApiResponse::create([
            'you' => $username,
            'editors' => array_map(fn ($s) => [
                'session' => $s['session'],
                'user' => $s['user'],
                'fullname' => $s['fullname'],
                'since' => $s['since'],
                'editing' => (bool) $s['editing'],
            ], $others),
            'modified' => $owner['modified'],
            'saved_by' => $latest['user'] ?? '',
        ]);
    }

    /** DELETE /maw-builder/presence?session=&<owner params>  (sent when the editor closes) */
    public function releasePresence(ServerRequestInterface $request): ResponseInterface
    {
        $params = $request->getQueryParams();
        $owner = $this->resolveOwner($request, $params);
        $session = (string) ($params['session'] ?? '');
        if (PresenceStore::validSession($session)) {
            (new PresenceStore($this->grav))->release($owner['owner'], $session);
        }

        return ApiResponse::noContent();
    }

    /* ================================================================ paste: media copy */

    /**
     * POST /maw-builder/media/copy  {from: <owner params>, to: <owner params>, files: [filename, ...]}
     * Copies media referenced by blocks pasted from another page / Flex object into the destination's folder.
     * → {copied, skipped, missing, refused}
     */
    public function copyMedia(ServerRequestInterface $request): ResponseInterface
    {
        $body = $this->getRequestBody($request);
        if (!is_array($body['from'] ?? null) || !is_array($body['to'] ?? null) || !is_array($body['files'] ?? null)) {
            throw new ValidationException('`from`, `to` and `files` are required.');
        }
        $from = $this->mediaFolderOf($this->resolveOwner($request, $body['from']));
        $to = $this->mediaFolderOf($this->resolveOwner($request, $body['to']));
        if (!$from || !$to) {
            throw new ValidationException('Media can only be copied between pages and folder-stored Flex objects.');
        }
        if (realpath($from) === realpath($to)) {
            return ApiResponse::create(['copied' => [], 'skipped' => array_values($body['files']), 'missing' => [], 'refused' => []]);
        }

        return ApiResponse::create(MediaCopy::copy($from, $to, $body['files']));
    }

    private function mediaFolderOf(array $owner): ?string
    {
        if ($owner['kind'] === 'page') {
            $path = $owner['page']->path();
            return $path && is_dir($path) ? $path : null;
        }

        return $owner['kind'] === 'flex' ? ($owner['media_folder'] ?? null) : null;
    }

    /**
     * Stable string for comparing block lists: keys sorted, empty values dropped, scalars as strings
     * (Admin2 may store `true`/`1`/`'1'` or omit an empty field; none of that is a real difference).
     */
    public static function comparable(mixed $value): string
    {
        $normalize = function (mixed $v) use (&$normalize): mixed {
            if (is_array($v)) {
                $list = array_is_list($v);
                $out = [];
                foreach ($v as $k => $item) {
                    $item = $normalize($item);
                    if ($item === null || $item === '' || $item === []) {
                        if ($list) {
                            $out[] = null;
                        }
                        continue;
                    }
                    $out[$k] = $item;
                }
                if (!$list) {
                    ksort($out);
                }

                return $out;
            }
            if (is_bool($v)) {
                return $v ? '1' : '0';
            }

            return $v === null ? null : (string) $v;
        };

        return (string) json_encode($normalize($value));
    }

    /** Global sections render inside cached Flex output: drop those render caches and let others hook in. */
    private function sectionChanged(string $id, string $action): void
    {
        try {
            $flex = $this->grav['flex_objects'] ?? null;
            if ($flex) {
                foreach ($flex->getDirectories() as $directory) {
                    if ($directory->isEnabled()) {
                        $directory->getCache('render')->clear();
                    }
                }
            }
        } catch (\Throwable $e) {
            $this->grav['log']->warning('maw-builder: could not clear Flex render cache: ' . $e->getMessage());
        }
        $this->fireEvent('onMawGlobalSectionChanged', ['id' => $id, 'action' => $action]);
    }

    /* ================================================================ helpers */

    /**
     * Resolve and authorize what the request is about.
     * @return array{kind:string, owner:string, title:string, saved:array, page?:PageInterface, type?:string, key?:string, media_folder?:?string}
     */
    private function resolveOwner(ServerRequestInterface $request, array $params): array
    {
        $context = (string) ($params['context'] ?? 'page');

        if ($context === 'section') {
            $this->requirePermission($request, self::PERMISSION);
            $id = (string) ($params['id'] ?? '');
            $section = (new SectionStore($this->grav))->get($id);
            if (!$section) {
                throw new NotFoundException("Global section '{$id}' not found.");
            }

            return ['kind' => 'section', 'owner' => 'section:' . $id, 'title' => $section['title'], 'saved' => $section['blocks'],
                'modified' => (int) $section['updated'], 'id' => $id];
        }

        if ($context === 'flex') {
            return $this->resolveFlexOwner($request, $params);
        }

        $this->requirePermission($request, self::PERMISSION);
        $route = '/' . trim((string) ($params['route'] ?? ''), '/');
        $pages = $this->grav['pages'];
        $pages->enablePages();
        $page = $pages->find($route === '/' ? $this->homeRoute() : $route);
        if (!$page) {
            throw new NotFoundException("Page not found at route: {$route}");
        }
        $field = in_array($params['field'] ?? 'blocks', ['blocks', 'blocks_after'], true) ? (string) ($params['field'] ?? 'blocks') : 'blocks';
        $saved = $page->header()->{$field} ?? [];
        $file = $page->filePath();

        return [
            'kind' => 'page',
            'owner' => 'page:' . $page->route(),
            'title' => (string) $page->title(),
            'saved' => is_array($saved) && array_is_list($saved) ? $saved : [],
            'modified' => $file && is_file($file) ? (int) filemtime($file) : (int) $page->modified(),
            'page' => $page,
        ];
    }

    private function resolveFlexOwner(ServerRequestInterface $request, array $params): array
    {
        $this->requirePermission($request, 'api.access');
        $type = preg_replace('/[^a-z0-9_-]/i', '', (string) ($params['type'] ?? ''));
        $key = (string) ($params['key'] ?? '');

        $flex = $this->grav['flex_objects'] ?? null;
        $directory = $flex && $type ? $flex->getDirectory($type) : null;
        if (!$directory || !$directory->isEnabled()) {
            throw new NotFoundException("Flex directory '{$type}' not found.");
        }
        $object = $key !== '' ? $directory->getObject($key) : null;
        if (!$object) {
            throw new NotFoundException("Object '{$key}' not found in '{$type}'.");
        }

        // Same rules as the Flex Objects API: super admins (api.super) pass; others need <prefix>.update from the
        // directory's `admin.permissions`. Flex's own isAuthorized() applies a 'test' scope with an explicit user.
        $user = $this->getUser($request);
        $allowed = $this->isSuperAdmin($user);
        if (!$allowed && class_exists(\Grav\Plugin\FlexObjects\Api\DirectoryPermission::class)) {
            $allowed = \Grav\Plugin\FlexObjects\Api\DirectoryPermission::isAuthorized($directory, 'update', $user, $this->getPermissionResolver());
        }
        if (!$allowed) {
            throw new ForbiddenException("You don't have permission to update {$directory->getTitle()}.");
        }

        $mediaFolder = null;
        if (method_exists($object, 'getMediaFolder') && ($folder = $object->getMediaFolder())) {
            $locator = $this->grav['locator'];
            $resolved = $locator->isStream($folder) ? $locator->findResource($folder, true, true) : $folder;
            $mediaFolder = $resolved && is_dir($resolved) ? $resolved : null;
        }
        $field = in_array($params['field'] ?? 'blocks', ['blocks', 'blocks_after'], true) ? (string) ($params['field'] ?? 'blocks') : 'blocks';
        $saved = $object->getProperty($field);

        return [
            'kind' => 'flex',
            'owner' => 'flex:' . $type . '/' . $object->getKey(),
            'title' => (string) ($object->getProperty('title') ?? $object->getProperty('name') ?? $directory->getTitle()),
            'saved' => is_array($saved) && array_is_list($saved) ? $saved : [],
            'modified' => (int) $object->getTimestamp(),
            'object' => $object,
            'type' => $type,
            'key' => (string) $object->getKey(),
            'media_folder' => $mediaFolder,
        ];
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
