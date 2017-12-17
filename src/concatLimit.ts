import { AsyncFunction, AsyncSupplier, Collection } from './types';
import { flatten, map, mapParallelTasks } from './utils';

export default function<T, U>(items: Collection<T>, limit: number,
                              f: AsyncFunction<T, Array<U>>): Promise<Array<U>> {
  const tasks: Collection<AsyncSupplier<Array<U>>> = map(items, (item) => () => f(item));
  return mapParallelTasks(tasks, limit).then(flatten);
}
