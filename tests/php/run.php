<?php
/**
 * MAW Builder PHP tests: zero dependencies, boots Grav like bin/grav.
 *
 *   php user/plugins/maw-builder/tests/php/run.php
 *
 * Stores write to a temp folder; the real user/data is never touched.
 */

declare(strict_types=1);

use Grav\Common\Grav;
use Grav\Common\Processors\InitializeProcessor;
use Grav\Plugin\MawBuilder\BlockRegistry;
use Grav\Plugin\MawBuilder\Controllers\BuilderController;
use Grav\Plugin\MawBuilder\MediaCopy;
use Grav\Plugin\MawBuilder\PatternStore;
use Grav\Plugin\MawBuilder\PresenceStore;
use Grav\Plugin\MawBuilder\PreviewDraft;
use Grav\Plugin\MawBuilder\RevisionStore;
use Grav\Plugin\MawBuilder\SectionConflict;
use Grav\Plugin\MawBuilder\SectionStore;

define('GRAV_CLI', true);
define('GRAV_REQUEST_TIME', microtime(true));

$root = dirname(__DIR__, 5);
chdir($root);
$loader = require $root . '/vendor/autoload.php';
require $root . '/user/plugins/api/vendor/autoload.php';
$loader->addPsr4('Grav\\Plugin\\MawBuilder\\', dirname(__DIR__, 2) . '/classes/');

$grav = Grav::instance(['loader' => $loader]);
InitializeProcessor::initializeCli($grav);

/* ---------------------------------------------------------------- tiny runner */

$tests = [];
$failures = 0;
function test(string $name, callable $fn): void { $GLOBALS['tests'][$name] = $fn; }
function eq(mixed $expected, mixed $actual, string $msg = ''): void
{
    if ($expected !== $actual) {
        throw new RuntimeException(($msg ? "$msg: " : '') . 'expected ' . var_export($expected, true) . ', got ' . var_export($actual, true));
    }
}
function ok(mixed $value, string $msg = 'expected truthy'): void { if (!$value) { throw new RuntimeException($msg); } }
function throws(string $class, callable $fn): void
{
    try { $fn(); } catch (Throwable $e) { if ($e instanceof $class) { return; } throw new RuntimeException("expected $class, got " . get_class($e) . ': ' . $e->getMessage()); }
    throw new RuntimeException("expected $class, nothing thrown");
}
function tmpdir(): string
{
    $dir = sys_get_temp_dir() . '/maw-builder-tests-' . bin2hex(random_bytes(4));
    mkdir($dir, 0775, true);
    register_shutdown_function(fn () => rrmdir($dir));
    return $dir;
}
function rrmdir(string $dir): void
{
    if (!is_dir($dir)) { return; }
    foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir, FilesystemIterator::SKIP_DOTS), RecursiveIteratorIterator::CHILD_FIRST) as $f) {
        $f->isDir() ? rmdir($f->getPathname()) : unlink($f->getPathname());
    }
    rmdir($dir);
}

/* ---------------------------------------------------------------- BlockRegistry */

test('registry knows theme blocks and global', function () use ($grav) {
    $r = new BlockRegistry($grav);
    ok($r->available(), 'theme blueprints/blocks found');
    ok($r->has('hero'));
    ok($r->has('global'));
    ok(!$r->has('nope'));
    ok(!$r->has('../hero'));
    ok(in_array('hidden', $r->settingKeys(), true));
    ok(in_array('hide_on', $r->settingKeys(), true), 'hide_on is a shared setting');
});

test('canonical moves flat content under the type, keeps settings flat and never discards a key', function () use ($grav) {
    $r = new BlockRegistry($grav);
    eq(['type' => 'faq', 'background' => 'alt', 'faq' => ['heading' => 'Q', 'extra' => 1]], $r->canonical(['type' => 'faq', 'background' => 'alt', 'heading' => 'Q', 'extra' => 1]));
    // With a nested map present every other key stays exactly where it was written (unknown settings, hand-written keys).
    eq(['type' => 'faq', 'heading' => 'F', 'bg_color' => '#123', 'zzz' => 'keep', 'faq' => ['heading' => 'N', 'zzz_nested' => 'keep']],
        $r->canonical(['type' => 'faq', 'heading' => 'F', 'bg_color' => '#123', 'zzz' => 'keep', 'faq' => ['heading' => 'N', 'zzz_nested' => 'keep']]));
});

test('normalize keeps unknown types, reports them, and refuses malformed ones', function () use ($grav) {
    $r = new BlockRegistry($grav);
    $n = $r->normalize([['type' => 'hero', 'hero' => []], ['type' => 'nope', 'nope' => ['x' => 1]], ['type' => '../etc'], 'junk', ['heading' => 'no type']]);
    eq(['hero', 'nope'], array_column($n['blocks'], 'type'));
    eq(['x' => 1], $n['blocks'][1]['nope'], 'unknown block keeps its content');
    eq(['nope'], $n['unknown']);
    eq([2, 3, 4], $n['invalid']);
});

test('patterns: ids are slugs unique across shipped and user folders, unknown types are reported', function () use ($grav) {
    $shipped = tmpdir();
    $user = tmpdir();
    file_put_contents("$shipped/hero-band.yaml", "title: Hero band\nblocks:\n  - type: hero\n    hero: {heading: H}\n");
    file_put_contents("$shipped/broken.yaml", "title: [unclosed\nblocks: x\n");
    file_put_contents("$user/old-theme.yaml", "title: Old\nblocks:\n  - type: nope\n");
    $store = new PatternStore($grav, new BlockRegistry($grav), $user, $shipped);
    eq('hero-band-2', $store->save('Hero band', 'section', '', [['type' => 'cta']])['id'], 'never shadows a shipped pattern');
    $byId = array_column($store->all(), null, 'id');
    eq(['hero-band', 'hero-band-2', 'old-theme'], array_keys($byId));
    eq('shipped', $byId['hero-band']['source']);
    eq([], $byId['hero-band']['unknown']);
    eq(['nope'], $byId['old-theme']['unknown']);
    ok($store->delete('old-theme'));
    ok(!$store->delete('hero-band'), 'shipped patterns cannot be deleted');
    ok(!$store->delete('../x'));
    ok(!PatternStore::validId('user:my-pat'), 'a colon would be eaten by the URI parser');
});

test('preview drafts are garbage-collected by their lifetime', function () use ($grav) {
    $dir = tmpdir();
    $drafts = new PreviewDraft($grav, $dir);
    $old = $drafts->put('/x', [], 'blocks', 'u');
    touch("$dir/$old.json", time() - $drafts->ttl() - 120);
    $new = $drafts->put('/y', [], 'blocks', 'u');
    ok(!is_file("$dir/$old.json"), 'expired draft removed on the next write');
    ok(is_file("$dir/$new.json"));
});

/* ---------------------------------------------------------------- SectionStore */

test('section create / update / rev conflict / delete', function () use ($grav) {
    SectionStore::flushCache();
    $store = new SectionStore($grav, tmpdir());
    $a = $store->create('Footer CTA', [['type' => 'cta', 'cta' => ['heading' => 'Hi']]], 'nick');
    eq('footer-cta', $a['id']);
    eq(1, $a['rev']);
    eq('footer-cta-2', $store->create('Footer CTA', [['type' => 'cta']], 'nick')['id'], 'ids are unique');

    $b = $store->update('footer-cta', null, [['type' => 'cta', 'cta' => ['heading' => 'Two']]], 'alex', 1);
    eq(2, $b['rev']);
    eq('alex', $b['updated_by']);

    throws(SectionConflict::class, fn () => $store->update('footer-cta', null, [], 'nick', 1));
    eq(3, $store->update('footer-cta', 'Renamed', null, 'nick', null)['rev'], 'null base rev = force');
    SectionStore::flushCache();
    eq('Renamed', $store->get('footer-cta')['title'], 'persisted');
    eq(3, $store->get('footer-cta')['rev']);

    ok($store->delete('footer-cta'));
    ok(!$store->delete('footer-cta'));
    ok(!$store->delete('../etc'));
    eq(null, $store->update('missing', null, [], 'x', null));
});

test('section usage only counts global blocks referencing the id', function () use ($grav) {
    $pages = tmpdir();
    mkdir("$pages/01.home");
    mkdir("$pages/02.about");
    mkdir("$pages/03.notes");
    file_put_contents("$pages/01.home/blocks.md", "---\ntitle: Home\nblocks:\n  - type: global\n    global: { section: footer-cta }\n---\n");
    file_put_contents("$pages/02.about/default.md", "---\ntitle: About\nblocks_after:\n  - type: global\n    global:\n      section: 'footer-cta'\n---\n");
    // Mentions the id in unrelated places: must not count.
    file_put_contents("$pages/03.notes/default.md", "---\ntitle: Notes\nsection: footer-cta\nblocks:\n  - type: rich-text\n    rich-text: { text: 'global footer-cta' }\n---\n");
    $usage = (new SectionStore($grav, tmpdir()))->usage('footer-cta', ['page' => $pages]);
    sort($usage);
    eq(['Page: 01.home', 'Page: 02.about'], $usage);
});

/* ---------------------------------------------------------------- RevisionStore */

test('revisions skip duplicates and prune to the configured limit', function () use ($grav) {
    $store = new RevisionStore($grav, tmpdir());
    ok($store->record('page:/x', [['type' => 'hero']], 'nick') !== null);
    eq(null, $store->record('page:/x', [['type' => 'hero']], 'nick'), 'identical snapshot skipped');
    ok($store->record('page:/x', [['type' => 'faq']], 'nick') !== null);
    eq(2, count($store->list('page:/x')));
    eq(['faq'], $store->list('page:/x', 1)[0]['types'], 'newest first');

    $keep = (int) $grav['config']->get('plugins.maw-builder.revisions.keep', 50);
    for ($i = 0; $i < $keep + 3; $i++) {
        $store->record('page:/y', [['type' => 'hero', 'hero' => ['n' => $i]]]);
        usleep(1500);
    }
    eq(max(5, $keep), count($store->list('page:/y')));
    $first = $store->list('page:/y', 1)[0];
    eq($keep + 2, $store->get('page:/y', $first['id'])['blocks'][0]['hero']['n']);
    eq(null, $store->get('page:/y', '../../x'));
});

/* ---------------------------------------------------------------- PreviewDraft */

test('preview drafts validate ids and expire', function () use ($grav) {
    $drafts = new PreviewDraft($grav);
    $id = $drafts->put('/about', [['type' => 'hero']], 'blocks', 'nick');
    eq(48, strlen($id));
    eq('/about', $drafts->get($id)['route']);
    eq(null, $drafts->get('nope'));
    eq(null, $drafts->get(str_repeat('z', 48)));
    // Force expiry.
    $file = $grav['locator']->findResource('cache://', true) . '/maw-builder/previews/' . $id . '.json';
    $data = json_decode((string) file_get_contents($file), true);
    $data['expires'] = time() - 1;
    file_put_contents($file, json_encode($data));
    eq(null, $drafts->get($id));
    ok(!is_file($file), 'expired draft removed');
});

/* ---------------------------------------------------------------- save-state comparison */

test('comparable ignores key order, empty values and scalar types', function () {
    $a = [['type' => 'hero', 'reveal' => true, 'hero' => ['heading' => 'Hi', 'eyebrow' => '', 'n' => 3]]];
    $b = [['hero' => ['n' => '3', 'heading' => 'Hi'], 'reveal' => '1', 'type' => 'hero']];
    eq(BuilderController::comparable($a), BuilderController::comparable($b));
    $c = [['type' => 'hero', 'hero' => ['heading' => 'Changed']]];
    ok(BuilderController::comparable($a) !== BuilderController::comparable($c));
    // List positions matter.
    ok(BuilderController::comparable([['type' => 'a'], ['type' => 'b']]) !== BuilderController::comparable([['type' => 'b'], ['type' => 'a']]));
});

/* ---------------------------------------------------------------- presence */

test('presence tracks other editors and expires stale sessions', function () use ($grav) {
    $p = new PresenceStore($grav, tmpdir());
    $p->touch('page:/x', 's1', 'nick', 'Nick', true);
    $others = $p->touch('page:/x', 's2', 'alex', 'Alex', false);
    eq(['nick'], array_column($others, 'user'));
    eq(true, $others[0]['editing']);
    eq(['alex'], array_column($p->others('page:/x', 's1'), 'user'));
    $p->release('page:/x', 's2');
    eq([], $p->others('page:/x', 's1'));
    $p->touch('page:/x', 'old', 'bob', 'Bob', true, time() - 3600);
    eq([], $p->others('page:/x', 's1'), 'stale session ignored');
    ok(!PresenceStore::validSession('../x'));
});

/* ---------------------------------------------------------------- media copy */

test('media copy copies images, skips existing, refuses unsafe names', function () {
    $from = tmpdir();
    $to = tmpdir();
    file_put_contents("$from/hero.jpg", 'jpg');
    file_put_contents("$from/logo.svg", '<svg/>');
    file_put_contents("$from/evil.php", '<?php');
    file_put_contents("$to/logo.svg", 'existing');
    $result = MediaCopy::copy($from, $to, ['hero.jpg', 'logo.svg', 'evil.php', '../secret.jpg', 'missing.png', 'user://media/x.jpg']);
    eq(['hero.jpg'], $result['copied']);
    eq(['logo.svg'], $result['skipped']);
    eq(['missing.png'], $result['missing']);
    eq(['evil.php', '../secret.jpg', 'user://media/x.jpg'], $result['refused']);
    eq('existing', file_get_contents("$to/logo.svg"));
    ok(is_file("$to/hero.jpg"));
    ok(!is_file("$to/evil.php"));
});

/* ---------------------------------------------------------------- run */

foreach ($tests as $name => $fn) {
    try {
        $fn();
        fwrite(STDOUT, "  ok   $name\n");
    } catch (Throwable $e) {
        $failures++;
        fwrite(STDOUT, "  FAIL $name\n       " . $e->getMessage() . "\n");
    }
}
fwrite(STDOUT, sprintf("\n%d tests, %d failed\n", count($tests), $failures));
exit($failures ? 1 : 0);
