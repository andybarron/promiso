const series = require('../src/series').default;
const { createTasks, createTasksAndStats } = require('./utils');

it('should run one task at a time', async () => {
  const { stats, tasks } = createTasksAndStats(10);
  await series(tasks);
  expect(stats.maxActive).toBe(1);
});

it('should return results in order', async () => {
  const tasks = createTasks(3);
  const result = await series(tasks);
  expect(result).toEqual([0, 1, 2]);
});

it('should call tasks in order', async () => {
  let counter = 0;
  const canary = jest.fn();
  const tasks = [];
  for (let i = 0; i < 5; i++) {
    tasks.push(async () => {
      await Promise.resolve();
      canary(i);
      return i;
    });
  }
  await series(tasks);
  expect(canary.mock.calls).toEqual([[0], [1], [2], [3], [4]]);
});
