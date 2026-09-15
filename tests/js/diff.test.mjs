import test from 'node:test';
import assert from 'node:assert/strict';
import { diffBlocks, diffSummary, flatten, pathLabel } from '../../src/lib/diff.js';

const hero = (heading, extra = {}) => ({ type: 'hero', ...extra, hero: { heading } });
const faq = (q) => ({ type: 'faq', faq: { items: [{ question: q }] } });
const ctx = {
  settings: [{ name: 'background', label: 'Background' }],
  defFor: (type) => (type === 'faq' ? { fields: [{ name: 'items', label: 'Questions', fields: [{ name: 'question', label: 'Question' }] }] } : { fields: [{ name: 'heading', label: 'Heading' }] }),
};

test('identical lists are all "same"', () => {
  const rows = diffBlocks([hero('A'), faq('Q')], [hero('A'), faq('Q')], ctx);
  assert.deepEqual(rows.map((r) => r.status), ['same', 'same']);
  assert.deepEqual(diffSummary(rows), { added: 0, removed: 0, changed: 0, moved: 0 });
});

test('detects added, removed, changed and moved blocks', () => {
  const before = [hero('A'), faq('Q'), faq('R'), { type: 'cta', cta: { heading: 'Go' } }, { type: 'stats', stats: {} }];
  const after = [{ type: 'stats', stats: {} }, hero('A2', { background: 'dark' }), faq('Q'), faq('R'), { type: 'logos', logos: {} }];
  const rows = diffBlocks(before, after, ctx);
  assert.deepEqual(diffSummary(rows), { added: 1, removed: 1, changed: 1, moved: 1 });

  const changed = rows.find((r) => r.status === 'changed');
  assert.equal(changed.type, 'hero');
  assert.deepEqual(changed.changes.map((c) => [c.label, c.before, c.after]).sort(), [['Background', '', 'dark'], ['Heading', 'A', 'A2']]);

  assert.equal(rows.find((r) => r.status === 'moved').type, 'stats');
  assert.equal(rows.find((r) => r.status === 'removed').type, 'cta');
  assert.equal(rows.find((r) => r.status === 'added').type, 'logos');
});

test('removed blocks are placed after their previous neighbour', () => {
  const rows = diffBlocks([hero('A'), faq('Gone'), { type: 'cta', cta: {} }], [hero('A'), { type: 'cta', cta: {} }], ctx);
  assert.deepEqual(rows.map((r) => `${r.status}:${r.type}`), ['same:hero', 'removed:faq', 'same:cta']);
});

test('flatten and labels', () => {
  assert.deepEqual(flatten({ a: { b: [1, { c: true }] }, empty: '', n: null }), { 'a.b.0': '1', 'a.b.1.c': 'Yes' });
  assert.equal(pathLabel(faq('x'), 'faq.items.0.question', ctx), 'Questions › 1 › Question');
  assert.equal(pathLabel(faq('x'), 'hide_on.1', ctx), 'Hide on › 2');
  assert.deepEqual(flatten({ hide_on: ['mobile', 'tablet'] }), { hide_on: 'mobile, tablet' });
  const rows = diffBlocks([hero('A')], [hero('A', { hide_on: ['mobile'] })], ctx);
  assert.deepEqual(rows[0].changes.map((c) => [c.label, c.before, c.after]), [['Hide on', '', 'mobile']]);
});
