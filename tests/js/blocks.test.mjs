import test from 'node:test';
import assert from 'node:assert/strict';
import { canonical, normalizeList, newListItem, createBlock, hiddenDevices } from '../../src/lib/blocks.js';

test('canonical nests flat content and keeps settings flat', () => {
  assert.deepEqual(canonical({ type: 'faq', background: 'alt', heading: 'Q' }), { type: 'faq', background: 'alt', faq: { heading: 'Q' } });
  assert.deepEqual(canonical({ type: 'faq', heading: 'flat', faq: { heading: 'nested' } }), { type: 'faq', faq: { heading: 'nested' } });
  assert.equal(canonical({ heading: 'no type' }), null);
});

test('normalizeList drops invalid items and non-lists', () => {
  assert.deepEqual(normalizeList([{ type: 'hero' }, null, 'x', { nope: 1 }]), [{ type: 'hero', hero: {} }]);
  assert.deepEqual(normalizeList({ type: 'hero' }), []);
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

test('hiddenDevices accepts list, comma list and map', () => {
  assert.deepEqual(hiddenDevices({ hide_on: ['desktop', 'mobile', 'watch'] }), ['mobile', 'desktop']);
  assert.deepEqual(hiddenDevices({ hide_on: 'tablet, mobile' }), ['mobile', 'tablet']);
  assert.deepEqual(hiddenDevices({ hide_on: { tablet: true, desktop: false } }), ['tablet']);
  assert.deepEqual(hiddenDevices({}), []);
});
