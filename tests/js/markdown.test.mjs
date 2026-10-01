import test from 'node:test';
import assert from 'node:assert/strict';
import { htmlToMarkdown, normalize, roundTrips, escapeText, unsafeHref, committedMarkdown, preserveSource, UnsafeMarkup } from '../../src/preview/markdown.js';

// Tiny node-shaped tree builder: t('text'), el('p', {href}, ...children)
const t = (s) => ({ nodeType: 3, nodeValue: s });
const el = (tag, attrs = {}, ...children) => ({
  nodeType: 1,
  tagName: tag.toUpperCase(),
  childNodes: children,
  getAttribute: (n) => (n in attrs ? attrs[n] : null),
  get textContent() { return children.map((c) => (c.nodeType === 3 ? c.nodeValue : c.textContent)).join(''); },
});
const root = (...children) => el('div', {}, ...children);

test('paragraphs, emphasis, links and code', () => {
  const html = root(el('p', {}, t('Hello '), el('strong', {}, t('bold')), t(' and '), el('em', {}, t('it')), t('.')), el('p', {}, el('a', { href: '/x' }, t('link')), t(' '), el('code', {}, t('a*b'))));
  assert.equal(htmlToMarkdown(html), 'Hello **bold** and *it*.\n\n[link](/x) `a*b`');
});

test('headings and lists, loose list items flattened', () => {
  const html = root(el('h3', {}, t('Title')), el('ul', {}, el('li', {}, el('p', {}, t('one'))), t('\n  '), el('li', {}, t('two'))), el('ol', {}, el('li', {}, t('a')), el('li', {}, t('b'))));
  assert.equal(htmlToMarkdown(html), '### Title\n\n- one\n- two\n\n1. a\n2. b');
});

test('inline mode keeps a single line and turns <br> into a space', () => {
  const html = root(t('one'), el('br'), t(' two '), el('b', {}, t('three')));
  assert.equal(htmlToMarkdown(html, { inline: true }), 'one two **three**');
});

test('strict mode refuses what cannot round-trip; lenient keeps the text', () => {
  const table = root(el('table', {}, el('tr', {}, el('td', {}, t('cell')))));
  assert.throws(() => htmlToMarkdown(table), UnsafeMarkup);
  assert.equal(htmlToMarkdown(table, { lenient: true }), 'cell');
  const nested = root(el('ul', {}, el('li', {}, t('a'), el('ul', {}, el('li', {}, t('b'))))));
  assert.throws(() => htmlToMarkdown(nested), UnsafeMarkup);
  assert.equal(htmlToMarkdown(nested, { lenient: true }), '- a b');
  const script = root(el('p', {}, el('a', { href: 'javascript:alert(1)' }, t('x'))));
  assert.throws(() => htmlToMarkdown(script), UnsafeMarkup);
  assert.equal(htmlToMarkdown(script, { lenient: true }), 'x');
});

test('execCommand quirk: a paragraph wrapping a list is a container', () => {
  const html = root(el('p', {}, el('ol', {}, el('li', {}, t('x')))));
  assert.equal(htmlToMarkdown(html), '1. x');
});

test('text is escaped so it survives re-rendering', () => {
  assert.equal(escapeText('a*b_c[d]`e\\f'), 'a\\*b\\_c\\[d\\]\\`e\\\\f');
  assert.equal(htmlToMarkdown(root(el('p', {}, t('2 * 3 = 6')))), '2 \\* 3 = 6');
});

test('text that looks like HTML or an entity stays text', () => {
  assert.equal(escapeText('a <b> c'), 'a &lt;b> c');
  assert.equal(escapeText('&amp; &#39; &x1;'), '&amp;amp; &amp;#39; &amp;x1;');
  assert.equal(escapeText('Tom & Jerry, a&b'), 'Tom & Jerry, a&b', 'a bare & is already literal');
  assert.equal(htmlToMarkdown(root(el('p', {}, t('<img src=x onerror=alert(1)>')))), '&lt;img src=x onerror=alert(1)>');
  assert.equal(htmlToMarkdown(root(t('<b>x</b> &lt;')), { inline: true }), '&lt;b>x&lt;/b> &amp;lt;');
});

test('script and data links are refused like javascript:', () => {
  for (const href of ['javascript:alert(1)', 'data:text/html,<script>alert(1)</script>', 'vbscript:msgbox(1)', ' JaVaScRiPt:x', 'java\tscript:x', '\x00data:x', 'DATA:image/svg+xml,x']) {
    assert.equal(unsafeHref(href), true, href);
    const html = root(el('p', {}, el('a', { href }, t('x'))));
    assert.throws(() => htmlToMarkdown(html), UnsafeMarkup, href);
    assert.equal(htmlToMarkdown(html, { lenient: true }), 'x', href);
  }
  for (const href of ['https://example.com', '/about', '#top', 'mailto:a@b.c', 'tel:123', 'my-data:x', '']) assert.equal(unsafeHref(href), false, href);
});

test('normalize makes equivalent Markdown spellings compare equal', () => {
  assert.equal(normalize('__bold__ and _it_\r\n\r\n* one\n+ two\n\n2) three'), normalize('**bold** and *it*\n\n- one\n- two\n\n1. three'));
  assert.equal(normalize('a\\*b'), normalize('a*b'));
  assert.equal(normalize('a &lt; b &amp; c'), normalize('a < b & c'));
});

test('roundTrips decides visual versus source editing', () => {
  const simple = root(el('p', {}, t('Hello '), el('strong', {}, t('world'))));
  assert.equal(roundTrips(simple, 'Hello __world__'), true);
  assert.equal(roundTrips(simple, 'Hello world'), false, 'stored source differs');
  assert.equal(roundTrips(root(el('table')), '|a|'), false, 'unsupported markup');
  assert.equal(roundTrips(root(t('a '), el('em', {}, t('b'))), 'a *b*', true), true);
  const lt = root(el('p', {}, t('a < b')));
  assert.equal(roundTrips(lt, 'a < b'), true, 'a bare < renders as text');
  assert.equal(roundTrips(lt, 'a &lt; b'), true);
});

// What the page renders for STORED (Parsedown: `3.` starts <ol start="3">), with one paragraph's text replaceable.
const STORED = 'Intro with __strong__ and _emphasis_ markers.\n\n3. third\n4. fourth\n5. fifth\n\n* one\n* two\n\nClosing paragraph to edit.\n';
const rendered = ({ closing = 'Closing paragraph to edit.', items = ['third', 'fourth', 'fifth'], bullets = ['one', 'two'] } = {}) => root(
  el('p', {}, t('Intro with '), el('strong', {}, t('strong')), t(' and '), el('em', {}, t('emphasis')), t(' markers.')),
  el('ol', { start: '3' }, ...items.map((x) => el('li', {}, t(x)))),
  el('ul', {}, ...bullets.map((x) => el('li', {}, t(x)))),
  el('p', {}, t(closing)),
);

test('the stored field is visually editable and an untouched commit changes nothing', () => {
  assert.equal(roundTrips(rendered(), STORED), true);
  assert.equal(committedMarkdown(rendered(), STORED), STORED, 'returned exactly as stored');
});

test('committing an edit keeps list numbers and emphasis markers elsewhere in the field', () => {
  const out = committedMarkdown(rendered({ closing: 'Closing paragraph, edited.' }), STORED);
  assert.equal(out, STORED.trim().replace('Closing paragraph to edit.', 'Closing paragraph, edited.'));
  // The converter alone would have rewritten all of it.
  assert.match(htmlToMarkdown(rendered({ closing: 'x' }), { lenient: true }), /^Intro with \*\*strong\*\* and \*emphasis\*/);
});

test('an edited list item keeps its own marker', () => {
  const out = committedMarkdown(rendered({ items: ['third', 'FOURTH', 'fifth'], bullets: ['one', 'TWO'] }), STORED);
  assert.equal(out, STORED.trim().replace('4. fourth', '4. FOURTH').replace('* two', '* TWO'));
});

test('a list that gains or loses items keeps its numbering style', () => {
  assert.equal(committedMarkdown(rendered({ items: ['third', 'new', 'fourth', 'fifth'], bullets: ['one', 'two', 'new'] }), STORED),
    STORED.trim().replace('4. fourth\n5. fifth', '4. new\n5. fourth\n6. fifth').replace('* two', '* two\n* new'));
  assert.equal(committedMarkdown(rendered({ items: ['third', 'fifth'] }), STORED), STORED.trim().replace('4. fourth\n5. fifth', '4. fifth'));
  // One repeated number (lazy numbering) stays that way.
  const lazy = '1. a\n1. b';
  assert.equal(committedMarkdown(root(el('ol', {}, el('li', {}, t('a')), el('li', {}, t('b')), el('li', {}, t('c')))), lazy), '1. a\n1. b\n1. c');
});

test('preserveSource leaves a rewritten field to the converter', () => {
  assert.equal(preserveSource('__a__', '**b**'), '**b**');
  assert.equal(preserveSource('', 'new text'), 'new text');
  assert.equal(preserveSource('a  \nb', 'a  \nc'), 'a  \nc', 'hard line break kept');
});
