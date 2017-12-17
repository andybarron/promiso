import { AsyncFunction, AsyncSupplier, Collection } from './types';
import { flatten, map, mapParallelTasks } from './utils';

export default function<T, U>(items: Collection<T>,
                              f: AsyncFunction<T, Array<U>>): Promise<Array<U>> {
  const tasks: Collection<AsyncSupplier<Array<U>>> = map(items, (item) => () => f(item));
  return mapParallelTasks(tasks, 1).then(flatten);
}
