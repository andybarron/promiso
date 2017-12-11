const concatSeries = require('../src/concatSeries').default;
const { createMapArgsAndStats } = require('./utils');

it('should map one item at a time', async () => {
  const { f, items, stats } = createMapArgsAndStats(10);
  await concatSeries(items, f);
  expect(stats.maxActive).toBe(1);
});

it('should concatenate results in order', async () => {
  const items = [1, 2, 3, 4, 5];
  const f = async (n) => [n, n * 2];
  const result = await concatSeries(items, f);
  expect(result).toEqual([1, 2, 2, 4, 3, 6, 4, 8, 5, 10]);
});

it('should map items in order', async () => {
  let counter = 0;
  const canary = jest.fn();
  const items = [0, 1, 2, 3, 4];
  const f = async (item) => {
    canary(item);
    return item;
  }
  await concatSeries(items, f);
  expect(canary.mock.calls).toEqual([[0], [1], [2], [3], [4]]);
});
