const series = require('../src/series');
const { createSleepTasks, createSleepTasksAndStats, sleep } = require('./utils');

it('should run one task at a time', async () => {
  const { stats, tasks } = createSleepTasksAndStats(10);
  await series(tasks);
  expect(stats.maxActive).toBe(1);
});

it('should return results in order', async () => {
  const tasks = createSleepTasks(3);
  const result = await series(tasks);
  expect(result).toEqual([0, 1, 2]);
});

it('should call tasks in order', async () => {
  let counter = 0;
  const canary = jest.fn();
  const tasks = [];
  for (let i = 0; i < 5; i++) {
    tasks.push(async () => {
      await sleep(0.01);
      canary(i);
      return i;
    });
  }
  await series(tasks);
  expect(canary.mock.calls).toEqual([[0], [1], [2], [3], [4]]);
});
