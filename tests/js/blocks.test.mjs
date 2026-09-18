import test from 'node:test';
import assert from 'node:assert/strict';
import { canonical, normalizeList, newListItem, createBlock, hiddenDevices, setField, fieldDefault, blockSummary, itemSummary, currentContext, isTextLike, DEFAULT_SETTING_KEYS } from '../../src/lib/blocks.js';

test('canonical nests flat content and keeps settings flat', () => {
  assert.deepEqual(canonical({ type: 'faq', background: 'alt', heading: 'Q' }), { type: 'faq', background: 'alt', faq: { heading: 'Q' } });
  assert.equal(canonical({ heading: 'no type' }), null);
});

test('canonical never discards a key', () => {
  // A nested map present: every other key stays where it was written, known setting or not.
  const block = { type: 'faq', heading: 'flat', bg_color: '#123456', text_color: 'light', zzz: 'keep', faq: { heading: 'nested', zzz_nested: 'keep' } };
  assert.deepEqual(canonical(block), { type: 'faq', heading: 'flat', bg_color: '#123456', text_color: 'light', zzz: 'keep', faq: { heading: 'nested', zzz_nested: 'keep' } });
  // The theme's custom colour settings are in the default key list, so a flat block keeps them flat.
  assert.ok(DEFAULT_SETTING_KEYS.includes('bg_color') && DEFAULT_SETTING_KEYS.includes('text_color'));
  assert.deepEqual(canonical({ type: 'hero', bg_color: '#123456', heading: 'H' }), { type: 'hero', bg_color: '#123456', hero: { heading: 'H' } });
  // Before the catalogue is known a flat block is left alone rather than guessed at.
  assert.deepEqual(canonical({ type: 'hero', mystery: 1, heading: 'H' }, null), { type: 'hero', mystery: 1, heading: 'H' });
  assert.deepEqual(canonical({ type: 'hero', mystery: 1, hero: { heading: 'H' } }, null), { type: 'hero', mystery: 1, hero: { heading: 'H' } });
});

test('normalizeList drops invalid items and non-lists but keeps unknown types', () => {
  assert.deepEqual(normalizeList([{ type: 'hero' }, null, 'x', { nope: 1 }, { type: 'mystery', mystery: { a: 1 } }]), [{ type: 'hero', hero: {} }, { type: 'mystery', mystery: { a: 1 } }]);
  assert.deepEqual(normalizeList({ type: 'hero' }), []);
});

test('setField: one rule for writing a value', () => {
  const t = { a: 1 };
  assert.equal(setField(t, 'a', ''), true);
  assert.deepEqual(t, {});
  assert.equal(setField(t, 'a', ''), false, 'already absent');
  assert.equal(setField(t, 'b', 0), true, 'zero is a value');
  assert.equal(setField(t, 'b', 0), false, 'unchanged');
  assert.equal(setField(t, 'c', []), false, 'an empty list is nothing');
  assert.deepEqual(t, { b: 0 });
});

test('fieldDefault coerces toggles and applies only on creation', () => {
  for (const d of [1, '1', true]) assert.equal(fieldDefault({ type: 'toggle', default: d }), true);
  assert.equal(fieldDefault({ type: 'toggle', default: 0 }), false);
  assert.equal(fieldDefault({ type: 'text', validate: { type: 'bool' }, default: '1' }), true);
  assert.equal(fieldDefault({ type: 'text' }), undefined);
  assert.deepEqual(fieldDefault({ type: 'list' }), []);
});

test('newListItem: new_item template, defaults, placeholders', () => {
  const field = {
    fields: [
      { name: 'title', type: 'text' },
      { name: 'text', type: 'textarea', label: 'Body (optional)' },
      { name: 'url', type: 'text' },
      { name: 'featured', type: 'toggle', default: 1 },
    ],
  };
  assert.deepEqual(newListItem(field, 'card'), { featured: true, title: 'New card', text: 'Body', url: '#' });
  assert.deepEqual(newListItem({ ...field, new_item: { title: 'Phone', url: 'tel:1' } }, 'card'), { featured: true, title: 'Phone', url: 'tel:1', text: 'Body' });
});

test('createBlock uses the example and field defaults', () => {
  const def = { type: 'cta', example: { type: 'cta', background: 'dark', cta: { heading: 'Go' } }, fields: [{ name: 'align', type: 'select', default: 'center' }, { name: 'heading', type: 'text' }] };
  assert.deepEqual(createBlock(def), { type: 'cta', background: 'dark', cta: { heading: 'Go', align: 'center' } });
});

test('summaries prefer the definition and strip Markdown', () => {
  const def = { fields: [{ name: 'image', type: 'filepicker' }, { name: 'intro', type: 'markdown' }, { name: 'heading', type: 'text' }] };
  assert.equal(blockSummary({ type: 'x', x: { image: 'a.jpg', intro: '**Bold** start', heading: 'H' } }, def), 'Bold start');
  assert.equal(blockSummary({ type: 'x', x: { title: 'T' } }), 'T');
  assert.equal(itemSummary({ q: '# Why' }, [{ name: 'q', type: 'text' }], 3), 'Why');
  assert.equal(itemSummary({}, [], 3), 'Item 4');
  assert.equal(isTextLike({ name: 'x', type: 'select' }), false);
  assert.equal(isTextLike({ name: 'x' }), true, 'type defaults to text');
});

test('currentContext reads the admin URL', () => {
  assert.deepEqual(currentContext('/admin/pages/edit/about/team'), { kind: 'page', route: '/about/team' });
  assert.deepEqual(currentContext('/admin/flex-objects/case-studies/acme'), { kind: 'flex', type: 'case-studies', key: 'acme' });
  assert.deepEqual(currentContext('/admin/flex-objects/case-studies/new'), { kind: 'flex', type: 'case-studies', key: null });
  assert.deepEqual(currentContext('/admin/dashboard'), { kind: 'unknown' });
});

test('hiddenDevices accepts list, comma list and map', () => {
  assert.deepEqual(hiddenDevices({ hide_on: ['desktop', 'mobile', 'watch'] }), ['mobile', 'desktop']);
  assert.deepEqual(hiddenDevices({ hide_on: 'tablet, mobile' }), ['mobile', 'tablet']);
  assert.deepEqual(hiddenDevices({ hide_on: { tablet: true, desktop: false } }), ['tablet']);
  assert.deepEqual(hiddenDevices({}), []);
});
