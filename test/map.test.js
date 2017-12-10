const map = require('../src/map');
const { createSleepItemsAndStats } = require('./utils');

it('should map all items at once', async () => {
  const { f, items, stats } = createSleepItemsAndStats(10);
  await map(items, f);
  expect(stats.maxActive).toBe(items.length);
});

it('should return results in order', async () => {
  const { f, items } = createSleepItemsAndStats(3);
  const result = await map(items, f);
  expect(result).toEqual([0, 1, 2]);
});
