import test from 'node:test';
import assert from 'node:assert/strict';
import { getPath, setPath, listAt, listOps, fieldDef, moveMany } from '../../src/lib/paths.js';

test('getPath / setPath address nested content', () => {
  const block = { type: 'faq' };
  assert.equal(getPath(block, 'items.0.question'), undefined);
  assert.equal(setPath(block, 'items.0.question', 'Why?'), true);
  assert.deepEqual(block, { type: 'faq', faq: { items: [{ question: 'Why?' }] } });
  assert.equal(setPath(block, 'items.0.question', 'Why?'), false, 'unchanged value');
  assert.equal(getPath(block, 'items.0.question'), 'Why?');
});

test('setPath removes the key on an empty value, like the inspector', () => {
  const block = { type: 'hero', hero: { heading: 'H', eyebrow: 'E' } };
  assert.equal(setPath(block, 'eyebrow', ''), true);
  assert.deepEqual(block.hero, { heading: 'H' });
  assert.equal(setPath(block, 'eyebrow', ''), false);
});

test('paths never reach the prototype chain', () => {
  const block = { type: 'hero', hero: {} };
  assert.throws(() => setPath(block, '__proto__.polluted', 'yes'));
  assert.throws(() => listAt(block, 'constructor.prototype.x'));
  assert.throws(() => getPath(block, 'prototype'));
  assert.equal(({}).polluted, undefined);
});

test('listAt creates the list and listOps edit it', () => {
  const block = { type: 'faq', faq: {} };
  const list = listAt(block, 'items');
  assert.equal(listOps.add(list, { q: 'a' }), 0);
  listOps.add(list, { q: 'b' });
  assert.equal(listOps.duplicate(list, 0), 1);
  assert.deepEqual(list.map((x) => x.q), ['a', 'a', 'b']);
  list[1].q = 'copy';
  assert.equal(list[0].q, 'a', 'duplicate is a deep copy');
  assert.equal(listOps.move(list, 2, 0), 0);
  assert.deepEqual(list.map((x) => x.q), ['b', 'a', 'copy']);
  assert.equal(listOps.move(list, 0, 9), -1);
  assert.equal(listOps.move(list, -1, 1), -1, 'a bad source index does nothing');
  assert.deepEqual(list.map((x) => x.q), ['b', 'a', 'copy']);
  assert.equal(listOps.remove(list, 2), 1);
  assert.equal(listOps.remove(list, 5), -1);
  assert.equal(block.faq.items, list);
});

test('fieldDef resolves nested list fields', () => {
  const fields = [{ name: 'items', type: 'list', fields: [{ name: 'title', type: 'text' }] }];
  assert.equal(fieldDef(fields, 'items').type, 'list');
  assert.equal(fieldDef(fields, 'items.3.title').name, 'title');
  assert.equal(fieldDef(fields, 'items.3.nope'), null);
});

test('moveMany moves a group and keeps order', () => {
  const list = ['a', 'b', 'c', 'd', 'e'];
  assert.deepEqual(moveMany(list, [1, 2], 1), [2, 3]);
  assert.deepEqual(list, ['a', 'd', 'b', 'c', 'e']);
  assert.deepEqual(moveMany(list, [0, 1], -1), [0, 1], 'blocked at the top');
  assert.deepEqual(list, ['a', 'd', 'b', 'c', 'e']);
  assert.deepEqual(moveMany(list, [3, 4], 1), [3, 4], 'blocked at the bottom');
  assert.deepEqual(moveMany(list, [0, 2], 1), [1, 2], 'non-contiguous selection is gathered');
  assert.deepEqual(list, ['d', 'a', 'b', 'c', 'e']);
});
