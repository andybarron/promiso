import { AsyncFunction } from './types';

const startThread = async <T> (taskConfigs: Array<TaskConfig<T>>,
                               results: Array<T>, handle: CancelHandle) => {
  while (taskConfigs.length && !handle.canceled) {
    const {task, index} = taskConfigs.pop() as TaskConfig<T>;
    const result = await task();
    results[index] = result;
  }
};

export = <T>(tasks: Array<AsyncFunction<T>>, limit = Infinity): Promise<Array<T>> => {
  const numThreads = Math.max(1, Math.min(tasks.length, limit));
  const handle: CancelHandle = {};
  const configs = tasks.map((task, index) => ({task, index}));
  const results: Array<T> = [];
  const threadPromises: Array<Promise<void>> = [];
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
  canceled?: boolean;
}

interface TaskConfig<T> {
  index: number;
  task: AsyncFunction<T>;
}
