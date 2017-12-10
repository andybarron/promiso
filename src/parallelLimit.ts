import { AsyncFunction } from './types';

export = <T>(tasks: AsyncFunction<T>[], limit: number = Infinity): Promise<T[]> => {
  const numThreads = Math.max(1, Math.min(tasks.length, limit));
  const handle: CancelHandle = {};
  const configs = tasks.map((task, index) => ({task, index}));
  const results: T[] = [];
  const threadPromises: Promise<void>[] = [];
  for (let i = 0; i < numThreads; i++) {
    threadPromises.push(startThread(configs, results, handle));
  }
  return Promise.all(threadPromises)
    .then(() => results)
    .catch((error) => {
      handle.canceled = true;
      throw error;
    });
};

interface CancelHandle {
  canceled?: boolean,
}

interface TaskConfig<T> {
  task: AsyncFunction<T>,
  index: number,
}

const startThread = async <T> (taskConfigs: TaskConfig<T>[], results: T[], handle: CancelHandle) => {
  while (taskConfigs.length && !handle.canceled) {
    const {task, index} = taskConfigs.pop() as TaskConfig<T>;
    const result = await task();
    results[index] = result;
  }
};
