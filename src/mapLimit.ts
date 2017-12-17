import { AsyncFunction, AsyncSupplier, Collection, MapObject } from './types';
import { map, mapParallelTasks } from './utils';

export default function<T, U>(items: Array<T>, limit: number,
                              f: AsyncFunction<T, U>): Promise<Array<U>>;
export default function<T, U>(items: MapObject<T>, limit: number,
                              f: AsyncFunction<T, U>): Promise<MapObject<U>>;
export default function<T, U>(items: Collection<T>, limit: number,
                              f: AsyncFunction<T, U>): Promise<Collection<U>> {
  const tasks: Collection<AsyncSupplier<U>> = map(items, (item) => () => f(item));
  return mapParallelTasks(tasks, limit);
}
