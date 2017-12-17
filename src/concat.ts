import { AsyncFunction, AsyncSupplier, Collection, MapCollection } from './types';
import { flatten, map, mapParallelTasks } from './utils';

export default function<T, U>(items: Array<T>, f: AsyncFunction<T, Array<U>>): Promise<Array<U>>
export default function<T, U>(items: MapCollection<T>, f: AsyncFunction<T, Array<U>>): Promise<MapCollection<U>>
export default function<T, U>(items: Collection<T>, f: AsyncFunction<T, Array<U>>): Promise<Collection<U>> {
  const tasks: Collection<AsyncSupplier<Array<U>>> = map(items, (item) => () => f(item));
  return mapParallelTasks(tasks, Infinity).then(flatten);
}
