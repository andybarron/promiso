const mapSeries = require('../src/mapSeries');
const { createSleepItemsAndStats } = require('./utils');

it('should map one item at a time', async () => {
  const { f, items, stats } = createSleepItemsAndStats(10);
  await mapSeries(items, f);
  expect(stats.maxActive).toBe(1);
});

it('should return results in order', async () => {
  const items = [1, 2, 3, 4, 5];
  const f = async (n) => n;
  const result = await mapSeries(items, f);
  expect(result).toEqual(items);
});

it('should map items in order', async () => {
  let counter = 0;
  const canary = jest.fn();
  const items = [0, 1, 2, 3, 4];
  const f = async (item) => {
    canary(item);
    return item;
  }
  await mapSeries(items, f);
  expect(canary.mock.calls).toEqual([[0], [1], [2], [3], [4]]);
});
