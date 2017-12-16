
const createMapArgsAndStats = (count, duration = 0.01) => {
  const stats = {
    active: 0,
    maxActive: 0,
  };
  const f = async (item) => {
    stats.active++;
    stats.maxActive = Math.max(stats.active, stats.maxActive);
    await Promise.resolve();
    stats.active--;
    return item;
  };
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(i);
  }
  return { f, items, stats };
};

const createTasksAndStats = (count, duration = 0.01) => {
  const stats = {
    active: 0,
    maxActive: 0,
    completed: 0,
  };
  const tasks = [];
  for (let i = 0; i < count; i++) {
    tasks.push(async () => {
      stats.active++;
      stats.maxActive = Math.max(stats.active, stats.maxActive);
      await Promise.resolve();
      stats.active--;
      stats.completed++;
      return i;
    });
  }
  return { stats, tasks };
};

const createTasks = (count, duration) => {
  const { tasks } = createTasksAndStats(count, duration);
  return tasks;
};

module.exports = {
  createMapArgsAndStats,
  createTasks,
  createTasksAndStats,
};
