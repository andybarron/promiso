import { AsyncSupplier } from './types';
import { runParallelTasks } from './utils';

export default <T>(tasks: Array<AsyncSupplier<T>>, limit = Infinity): Promise<Array<T>> => {
  const results: Array<T> = Array(tasks.length);
  const threadTasks: Array<AsyncSupplier<void>> = tasks.map((task, index) => () => {
    return Promise.resolve(task()).then((result) => {
      results[index] = result;
    });
  });
  return runParallelTasks(threadTasks, limit).then(() => results);
};
