const mapLimit = require('../src/mapLimit');
const { createMapArgsAndStats } = require('./utils');

it('should limit max mapping items', async () => {
  const limit = 2;
  const { f, items, stats } = createMapArgsAndStats(10);
  await mapLimit(items, limit, f);
  expect(stats.maxActive).toBe(limit);
});

it('should return results in order', async () => {
  const { f, items } = createMapArgsAndStats(5);
  const result = await mapLimit(items, 2, f);
  expect(result).toEqual([0, 1, 2, 3, 4]);
});
