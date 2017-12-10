
const sleep = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

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
  createSleepTasks,
  createSleepTasksAndStats,
  sleep,
};
