
const sleep = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

const createSleepItemsAndStats = (count, duration = 0.01) => {
  const stats = {
    active: 0,
    maxActive: 0,
  };
  const f = async (item) => {
    stats.active++;
    stats.maxActive = Math.max(stats.active, stats.maxActive);
    await sleep(duration);
    stats.active--;
    return item;
  };
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(i);
  }
  return { f, items, stats };
};

const createSleepTasksAndStats = (count, duration = 0.01) => {
  const stats = {
    active: 0,
    maxActive: 0,
  };
  const tasks = [];
  for (let i = 0; i < count; i++) {
    tasks.push(async () => {
      stats.active++;
      stats.maxActive = Math.max(stats.active, stats.maxActive);
      await sleep(duration);
      stats.active--;
      return i;
    });
  }
  return { stats, tasks };
};

const createSleepTasks = (count, duration) => {
  const { tasks } = createSleepTasksAndStats(count, duration);
  return tasks;
};

module.exports = {
  createSleepItemsAndStats,
  createSleepTasks,
  createSleepTasksAndStats,
  sleep,
};
