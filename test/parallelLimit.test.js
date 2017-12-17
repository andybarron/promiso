const parallelLimit = require('../src/parallelLimit').default;
const { createTasks, createTasksAndStats } = require('./utils');

it('should limit max running tasks', async () => {
  const limit = 2;
  const { stats, tasks } = createTasksAndStats(10);
  await parallelLimit(tasks, limit);
  expect(stats.maxActive).toBe(limit);
});

it('should return results in order', async () => {
  const tasks = createTasks(3);
  const result = await parallelLimit(tasks, 3);
  expect(result).toEqual([0, 1, 2]);
});

it('should abort early if a task throws', async () => {
  const { stats, tasks } = createTasksAndStats(10);
  tasks.splice(Math.floor(tasks.length / 2), 0, async () => {
    throw new Error('expected');
  });
  await expect(parallelLimit(tasks, 3)).rejects.toBeDefined();
  expect(stats.completed).toBeLessThan(tasks.length);
});

it('should work on objects', async () => {
  const tasks = {};
  createTasks(3).forEach((task, index) => tasks[index] = task);
  const result = await parallelLimit(tasks, 2);
  expect(result).toEqual({
    0: 0,
    1: 1,
    2: 2,
  });
});
