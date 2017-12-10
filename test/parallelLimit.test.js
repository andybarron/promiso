const parallelLimit = require('../src/parallelLimit');
const { createSleepTasks, createSleepTasksAndStats } = require('./utils');

it('should limit max running tasks', async () => {
  const limit = 2;
  const { stats, tasks } = createSleepTasksAndStats(10);
  await parallelLimit(tasks, limit);
  expect(stats.maxActive).toBe(limit);
});

it('should default to no limit', async () => {
  const { stats, tasks } = createSleepTasksAndStats(25);
  await parallelLimit(tasks);
  expect(stats.maxActive).toBe(tasks.length);
});

it('should return results in order', async () => {
  const tasks = createSleepTasks(3);
  const result = await parallelLimit(tasks, 3);
  expect(result).toEqual([0, 1, 2]);
});

it('should abort early if a task throws', async () => {
  const { stats, tasks } = createSleepTasksAndStats(10);
  tasks.splice(Math.floor(tasks.length / 2), 0, async () => {
    throw new Error('expected');
  });
  await expect(parallelLimit(tasks, 3)).rejects.toBeDefined();
});
