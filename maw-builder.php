<?php
namespace Grav\Plugin;

use Composer\Autoload\ClassLoader;
use Grav\Common\Page\Media;
use Grav\Common\Page\Page;
use Grav\Common\Plugin;
use Grav\Plugin\MawBuilder\Controllers\BuilderController;
use Grav\Plugin\MawBuilder\EditMarkers;
use Grav\Plugin\MawBuilder\PreviewDraft;
use Grav\Plugin\MawBuilder\RevisionStore;
use Grav\Plugin\MawBuilder\SectionStore;
use RocketTheme\Toolbox\Event\Event;

/**
 * MAW Builder: visual block builder for Admin2.
 *
 * - Registers `/api/v1/maw-builder/*` endpoints (block catalogue, patterns, preview drafts, sections, revisions).
 * - Swaps `blocks` list fields for the `blocks` custom field (admin-next/fields/blocks.js) in page and Flex blueprints.
 * - Owns the inline-editing Twig functions themes call (classes/EditMarkers.php).
 * - Renders unsaved drafts on the front end:
 *     pages:        <page url>?maw_preview=<id>      (the real page, blocks replaced)
 *     flex objects: /_maw-preview/<id>               (a virtual page using the object's media folder)
 *
 * Events are subscribed statically. The two front-end hooks return early under the admin because they only make
 * sense for a rendered page; Admin2 itself never reaches them.
 */
class MawBuilderPlugin extends Plugin
{
    public const STANDALONE_PREFIX = '/_maw-preview/';

    public static function getSubscribedEvents(): array
    {
        return [
            'onApiRegisterRoutes'    => ['onApiRegisterRoutes', 0],
            'onApiBlueprintResolved' => ['onApiBlueprintResolved', 0],
            'onPagesInitialized'     => ['onPagesInitialized', 100],
            'onPageInitialized'      => ['onPageInitialized', 100],
            'onTwigSiteVariables'    => ['onTwigSiteVariables', 0],
            'onTwigTemplatePaths'    => ['onTwigTemplatePaths', 0],
            // Before the theme's own onTwigInitialized (priority 0), so a theme can see the markers are registered.
            'onTwigInitialized'      => ['onTwigInitialized', 10],
            'onAdminSave'            => ['onAdminSave', 0],
            'onAdminAfterSave'       => ['onAdminAfterSave', 0],
        ];
    }

    /**
     * Twig helpers:
     *   maw_global_section(id)  → {id, title, blocks} or null
     *   maw_preview_active()    → true while rendering inside the builder preview
     *   maw_edit*()             → inline-editing markers (EditMarkers)
     */
    public function onTwigInitialized(): void
    {
        $env = $this->grav['twig']->twig;
        $env->addFunction(new \Twig\TwigFunction('maw_global_section', fn ($id) => (new SectionStore($this->grav))->get((string) $id)));
        $env->addFunction(new \Twig\TwigFunction('maw_preview_active', fn () => $this->previewActive()));
        EditMarkers::register($env, fn () => $this->previewActive());
        $this->grav[EditMarkers::REGISTERED] = true;
    }

    private function previewActive(): bool
    {
        return isset($this->grav['maw_preview']);
    }

    /**
     * Revision history: snapshot `blocks` after every save of a page or Flex object (duplicates are skipped).
     * Fired by the API for page updates/creates and by the Flex Objects API for object updates/creates.
     */
    public function onAdminAfterSave(Event $event): void
    {
        $object = $event['object'] ?? null;
        try {
            $user = (string) ($this->grav['user']->username ?? '');
        } catch (\Throwable) {
            $user = ''; // resolving the user can require a full web request (e.g. remember-me login)
        }
        try {
            if ($object instanceof \Grav\Common\Page\Interfaces\PageInterface) {
                $blocks = $object->header()->blocks ?? null;
                if (is_array($blocks) && array_is_list($blocks)) {
                    (new RevisionStore($this->grav))->record('page:' . $object->route(), $blocks, $user);
                }
            } elseif (is_object($object) && method_exists($object, 'getFlexType') && method_exists($object, 'getProperty')) {
                $blocks = $object->getProperty('blocks');
                if (is_array($blocks) && array_is_list($blocks)) {
                    (new RevisionStore($this->grav))->record('flex:' . $object->getFlexType() . '/' . $object->getKey(), $blocks, $user);
                }
            }
        } catch (\Throwable $e) {
            // History must never break saving.
            $this->grav['log']->warning('maw-builder: could not record revision: ' . $e->getMessage());
        }
    }

    /**
     * Keep `blocks` a list. Admin2 can apply list-item defaults to the list itself on create
     * (`blocks: {type: rich-text, ...}`), which no renderer can use.
     *
     * Only pages: the Flex Objects API fires onAdminAfterSave alone. A map whose values are themselves blocks
     * (numeric string keys after a delete, for instance) is re-indexed and a lone block map is wrapped; anything
     * else is left as it is and logged, because throwing the author's content away silently is never the repair.
     */
    public function onAdminSave(Event $event): void
    {
        $object = $event['object'] ?? null;
        if (!$object instanceof \Grav\Common\Page\Interfaces\PageInterface) {
            return;
        }
        $header = $object->header();
        foreach (['blocks', 'blocks_after'] as $key) {
            $value = $header->{$key} ?? null;
            if ($value === null || !is_array($value) || array_is_list($value)) {
                continue;
            }
            $allBlocks = $value !== [];
            foreach ($value as $item) {
                if (!is_array($item) || !isset($item['type'])) {
                    $allBlocks = false;
                    break;
                }
            }
            if ($allBlocks) {
                $header->{$key} = array_values($value);
            } elseif (isset($value['type'])) {
                $header->{$key} = [$value];
            } else {
                $this->grav['log']->warning("maw-builder: '{$key}' on {$object->route()} is not a list of blocks; left untouched.");
            }
        }
    }

    public function autoload(): ClassLoader
    {
        $loader = new ClassLoader();
        $loader->addPsr4('Grav\\Plugin\\MawBuilder\\', __DIR__ . '/classes/');
        $loader->register();

        return $loader;
    }

    public function onApiRegisterRoutes(Event $event): void
    {
        $routes = $event['routes'];
        $routes->group('/maw-builder', function ($r) {
            $r->get('/blocks', [BuilderController::class, 'blocks']);
            $r->get('/patterns', [BuilderController::class, 'patterns']);
            $r->post('/patterns', [BuilderController::class, 'savePattern']);
            $r->delete('/patterns/{id}', [BuilderController::class, 'deletePattern']);
            $r->post('/preview', [BuilderController::class, 'preview']);
            $r->post('/state', [BuilderController::class, 'state']);
            $r->post('/presence', [BuilderController::class, 'presence']);
            $r->delete('/presence', [BuilderController::class, 'releasePresence']);
            $r->post('/media/copy', [BuilderController::class, 'copyMedia']);
            $r->get('/revisions', [BuilderController::class, 'revisions']);
            $r->get('/revisions/{id}', [BuilderController::class, 'revision']);
            $r->get('/sections', [BuilderController::class, 'sections']);
            $r->post('/sections', [BuilderController::class, 'createSection']);
            $r->get('/sections/{id}', [BuilderController::class, 'section']);
            $r->patch('/sections/{id}', [BuilderController::class, 'updateSection']);
            $r->delete('/sections/{id}', [BuilderController::class, 'deleteSection']);
        });
    }

    /**
     * Replace `blocks` list fields with the visual builder field.
     * Pages: `header.blocks` / `header.blocks_after`. Flex objects (template `flex-objects/<type>`): `blocks` / `blocks_after`.
     * The original list definition stays under `fields`, so turning the plugin off restores the native field.
     */
    public function onApiBlueprintResolved(Event $event): void
    {
        if (!$this->config->get('plugins.maw-builder.replace_field', true)) {
            return;
        }
        $context = $event['context'] ?? null;
        $template = (string) ($event['template'] ?? '');
        $isFlex = $context === null && str_starts_with($template, 'flex-objects/');
        if ($context !== 'page' && !$isFlex) {
            return;
        }
        $names = $isFlex ? ['blocks', 'blocks_after'] : ['header.blocks', 'header.blocks_after'];
        $fields = $event['fields'];
        if (is_array($fields)) {
            $event['fields'] = $this->swapBlocksField($fields, $names);
        }
    }

    private function swapBlocksField(array $fields, array $names): array
    {
        foreach ($fields as $i => $field) {
            if (!is_array($field)) {
                continue;
            }
            if (in_array($field['name'] ?? null, $names, true) && ($field['type'] ?? null) === 'list') {
                $fields[$i]['type'] = 'blocks';
                $fields[$i]['original_type'] = 'list';
            } elseif (!empty($field['fields']) && is_array($field['fields'])) {
                $fields[$i]['fields'] = $this->swapBlocksField($field['fields'], $names);
            }
        }

        return $fields;
    }

    /**
     * Standalone previews (Flex objects, anything without its own page): register a virtual page at /_maw-preview/<id>.
     */
    public function onPagesInitialized(): void
    {
        if ($this->isAdmin()) {
            return;
        }
        $path = (string) $this->grav['uri']->path();
        if (!str_starts_with($path, self::STANDALONE_PREFIX)) {
            return;
        }
        $id = substr($path, strlen(self::STANDALONE_PREFIX));
        $draft = (new PreviewDraft($this->grav))->get($id);
        if (!$draft || ($draft['mode'] ?? 'page') !== 'standalone') {
            return;
        }

        $page = new Page();
        $page->init(new \SplFileInfo(__DIR__ . '/pages/preview.md'));
        $route = self::STANDALONE_PREFIX . $id;
        $page->route($route);
        $page->rawRoute($route);
        $header = $page->header();
        $header->title = (string) ($draft['title'] ?? 'Preview');
        // The theme's page template for a page made only of blocks (`blocks` in maw-starter).
        $template = preg_replace('/[^a-z0-9_-]/i', '', (string) $this->config->get('plugins.maw-builder.preview_template', 'blocks')) ?: 'blocks';
        $header->template = $template;
        $page->header($header);
        $page->template($template);
        $page->title($header->title);

        $folder = $draft['media_folder'] ?? null;
        if ($folder && is_dir($folder)) {
            $page->media(new Media($folder));
        }

        // Flex object: render its own layout with the draft blocks applied in memory (never saved),
        // so the preview matches the live object page.
        $flexRef = $draft['flex'] ?? null;
        $flex = $this->grav['flex_objects'] ?? null;
        if (is_array($flexRef) && $flex && ($directory = $flex->getDirectory((string) $flexRef['type']))) {
            $object = $directory->getObject((string) $flexRef['key']);
            if ($object) {
                $object->setProperty($draft['field'] ?? 'blocks', $draft['blocks']);
                // {% render %} caches by object key and stored checksum, neither of which an in-memory change
                // touches (FlexObject::getCacheKey / getCacheChecksum), so a warm entry would show the saved
                // object instead of the draft.
                try {
                    $directory->getCache('render')->clear();
                } catch (\Throwable $e) {
                    $this->grav['log']->warning('maw-builder: could not clear Flex render cache: ' . $e->getMessage());
                }
                $this->grav['maw_preview_object'] = $object;
                $header->template = 'maw-builder/flex-preview';
                $page->header($header);
                $page->template('maw-builder/flex-preview');
            }
        }

        $this->grav['pages']->addPage($page, $route);
    }

    /**
     * Front end: when a valid preview id is present, render the draft blocks instead of the saved ones.
     */
    public function onPageInitialized(Event $event): void
    {
        if ($this->isAdmin()) {
            return;
        }
        $page = $event['page'] ?? $this->grav['page'];
        if (!$page) {
            return;
        }

        $path = (string) $this->grav['uri']->path();
        $id = str_starts_with($path, self::STANDALONE_PREFIX)
            ? substr($path, strlen(self::STANDALONE_PREFIX))
            : (string) ($_GET['maw_preview'] ?? '');
        if ($id === '') {
            return;
        }

        $draft = (new PreviewDraft($this->grav))->get($id);
        if (!$draft || rtrim((string) $draft['route'], '/') !== rtrim((string) $page->route(), '/')) {
            return;
        }

        // header() returns the live object: mutate it in place. Passing it back through the setter would
        // re-derive `published`/`routable` from the frontmatter (Page::header in Grav 2), undoing the API's
        // in-memory unlock of an unpublished page for this preview.
        $page->header()->{$draft['field'] ?? 'blocks'} = $draft['blocks'];
        $this->grav['maw_preview'] = true;

        // Markdown output would serve the saved body instead of this render.
        $this->grav['config']->set('system.pages.markdown_output.enabled', false);

        // Page::httpHeaders() overwrites a Cache-Control set with header(); these are the supported knobs.
        $page->expires(0);
        $page->cacheControl('no-store, max-age=0');
        if (!headers_sent()) {
            header('X-Robots-Tag: noindex, nofollow');
            header("Content-Security-Policy: frame-ancestors 'self'");
            // The draft id is a bearer capability in the URL: keep it out of third-party asset requests.
            header('Referrer-Policy: no-referrer');
        }
    }

    /** Plugin templates (maw-builder/flex-preview.html.twig) are appended, so themes can override them. */
    public function onTwigTemplatePaths(): void
    {
        $this->grav['twig']->twig_paths[] = __DIR__ . '/templates';
    }

    public function onTwigSiteVariables(): void
    {
        if (!$this->previewActive()) {
            return;
        }
        $twig = $this->grav['twig'];
        // `maw_preview` as a plain variable, so a theme template can test it without depending on this plugin's functions.
        $twig->twig_vars['maw_preview'] = true;
        if (isset($this->grav['maw_preview_object'])) {
            $twig->twig_vars['maw_preview_object'] = $this->grav['maw_preview_object'];
        }
        $assets = $this->grav['assets'];
        $assets->addCss('plugin://maw-builder/assets/preview-bridge.css', 1);
        $assets->addJs('plugin://maw-builder/assets/preview-bridge.js', ['group' => 'bottom', 'priority' => 1]);
    }
}
