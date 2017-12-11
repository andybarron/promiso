const concat = require('../src/concat');
const { createSleepItemsAndStats } = require('./utils');

it('should map all items at once', async () => {
  const { f, items, stats } = createSleepItemsAndStats(10);
  await concat(items, f);
  expect(stats.maxActive).toBe(items.length);
});

it('should concatenate results in order', async () => {
  const items = [1, 2, 3, 4, 5];
  const f = (n) => [n, n * 2];
  const result = await concat(items, f);
  expect(result).toEqual([1, 2, 2, 4, 3, 6, 4, 8, 5, 10]);
});
