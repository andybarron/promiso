const map = require('../src/map');
const { createMapArgsAndStats } = require('./utils');

it('should map all items at once', async () => {
  const { f, items, stats } = createMapArgsAndStats(10);
  await map(items, f);
  expect(stats.maxActive).toBe(items.length);
});

it('should return results in order', async () => {
  const { f, items } = createMapArgsAndStats(3);
  const result = await map(items, f);
  expect(result).toEqual([0, 1, 2]);
});
