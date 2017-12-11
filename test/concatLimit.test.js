const concatLimit = require('../src/concatLimit');
const { createMapArgsAndStats } = require('./utils');

it('should limit max mapping items', async () => {
  const limit = 2;
  const { f, items, stats } = createMapArgsAndStats(10);
  await concatLimit(items, limit, f);
  expect(stats.maxActive).toBe(limit);
});

it('should concatenate results in order', async () => {
  const items = [1, 2, 3, 4, 5];
  const f = (n) => [n, n * 2];
  const result = await concatLimit(items, 2, f);
  expect(result).toEqual([1, 2, 2, 4, 3, 6, 4, 8, 5, 10]);
});
