import test from 'node:test';
import assert from 'node:assert/strict';
import { htmlToMarkdown, normalize, roundTrips, escapeText, UnsafeMarkup } from '../../src/preview/markdown.js';

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

test('normalize makes equivalent Markdown spellings compare equal', () => {
  assert.equal(normalize('__bold__ and _it_\r\n\r\n* one\n+ two\n\n2) three'), normalize('**bold** and *it*\n\n- one\n- two\n\n1. three'));
  assert.equal(normalize('a\\*b'), normalize('a*b'));
});

test('roundTrips decides visual versus source editing', () => {
  const simple = root(el('p', {}, t('Hello '), el('strong', {}, t('world'))));
  assert.equal(roundTrips(simple, 'Hello __world__'), true);
  assert.equal(roundTrips(simple, 'Hello world'), false, 'stored source differs');
  assert.equal(roundTrips(root(el('table')), '|a|'), false, 'unsupported markup');
  assert.equal(roundTrips(root(t('a '), el('em', {}, t('b'))), 'a *b*', true), true);
});
