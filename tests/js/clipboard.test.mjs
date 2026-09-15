import test from 'node:test';
import assert from 'node:assert/strict';
import { makePayload, parsePayload, mediaRefs, isOwnMedia, sameOwner } from '../../src/lib/clipboard.js';

const src = { context: 'page', route: '/about' };

test('payload round-trips and ignores foreign text', () => {
  const blocks = [{ type: 'hero', hero: { heading: 'Hi' } }];
  const text = JSON.stringify(makePayload(blocks, { source: src, theme: 'maw-starter' }));
  const parsed = parsePayload(text);
  assert.deepEqual(parsed.blocks, blocks);
  assert.deepEqual(parsed.source, src);
  assert.equal(parsed.theme, 'maw-starter');
  assert.equal(parsePayload('hello'), null);
  assert.equal(parsePayload('{"maw-blocks": 99, "blocks": []}'), null);
  assert.equal(parsePayload('{"maw-blocks": 1'), null);
});

test('drops unknown types and globals inside sections', () => {
  const text = JSON.stringify(makePayload([{ type: 'hero' }, { type: 'mystery' }, { type: 'global', global: { section: 'x' } }]));
  const known = (t) => t !== 'mystery';
  assert.deepEqual(parsePayload(text, { knownType: known }).blocks.map((b) => b.type), ['hero', 'global']);
  const inSection = parsePayload(text, { knownType: known, inSection: true });
  assert.deepEqual(inSection.blocks.map((b) => b.type), ['hero']);
  assert.deepEqual(inSection.skipped, ['mystery', 'global']);
});

test('mediaRefs finds bare filenames in media fields, including lists', () => {
  const defs = {
    hero: { fields: [{ name: 'image', type: 'filepicker' }, { name: 'heading', type: 'text' }] },
    logos: { fields: [{ name: 'items', type: 'list', fields: [{ name: 'logo', type: 'filepicker' }] }] },
  };
  const blocks = [
    { type: 'hero', hero: { image: 'hero.jpg', heading: 'photo.jpg' } },
    { type: 'logos', logos: { items: [{ logo: 'a.svg' }, { logo: 'user://media/b.svg' }, { logo: 'https://x.com/c.png' }, { logo: 'a.svg' }] } },
    { type: 'unknown', unknown: { image: 'z.png' } },
  ];
  assert.deepEqual(mediaRefs(blocks, (t) => defs[t]), ['hero.jpg', 'a.svg']);
  assert.equal(isOwnMedia('../x.jpg'), false);
});

test('sameOwner', () => {
  assert.equal(sameOwner(src, { context: 'page', route: '/about/' }), true);
  assert.equal(sameOwner(src, { context: 'page', route: '/contact' }), false);
  assert.equal(sameOwner({ context: 'flex', type: 'a', key: '1' }, { context: 'flex', type: 'a', key: '1' }), true);
  assert.equal(sameOwner({ context: 'section', id: 'x' }, src), false);
});
