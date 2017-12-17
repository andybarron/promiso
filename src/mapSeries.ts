import { AsyncFunction, AsyncSupplier, Collection, MapObject } from './types';
import { map, mapParallelTasks } from './utils';

export default function<T, U>(items: Array<T>, f: AsyncFunction<T, U>): Promise<Array<U>>;
export default function<T, U>(items: MapObject<T>,
                              f: AsyncFunction<T, U>): Promise<MapObject<U>>;
export default function<T, U>(items: Collection<T>,
                              f: AsyncFunction<T, U>): Promise<Collection<U>> {
  const tasks: Collection<AsyncSupplier<U>> = map(items, (item) => () => f(item));
  return mapParallelTasks(tasks, 1);
}
