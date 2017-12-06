import { AsyncFunction } from './types';

export = <T>(tasks: AsyncFunction<T>[], limit: number = Infinity): Promise<T[]> => {
  const numThreads = Math.min(tasks.length, Math.round(limit));
  const configs = tasks.map((task, index) => ({task, index}));
  const results: T[] = [];
  const threadPromises: Promise<void>[] = [];
  for (let i = 0; i < numThreads; i++) {
    threadPromises.push(startThread(configs, results));
  }
  return Promise.all(threadPromises).then(() => results);
};

interface TaskConfig<T> {
  task: AsyncFunction<T>,
  index: number,
}

const startThread = async <T> (taskConfigs: TaskConfig<T>[], results: T[]) => {
  while (taskConfigs.length) {
    const {task, index} = taskConfigs.pop() as TaskConfig<T>;
    const result = await task();
    results[index] = result;
  }
};
