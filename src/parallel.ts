import { AsyncSupplier, Collection, MapObject } from './types';
import { mapParallelTasks } from './utils';

export default function<T>(tasks: Array<AsyncSupplier<T>>): Promise<Array<T>>;
export default function<T>(tasks: MapObject<AsyncSupplier<T>>): Promise<MapObject<T>>;
export default function<T>(tasks: Collection<AsyncSupplier<T>>): Promise<Collection<T>> {
  return mapParallelTasks(tasks, Infinity);
}
