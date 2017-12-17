import { AsyncSupplier, Collection, MapCollection } from './types';
import { mapParallelTasks } from './utils';

export default function<T>(tasks: Array<AsyncSupplier<T>>): Promise<Array<T>>
export default function<T>(tasks: MapCollection<AsyncSupplier<T>>): Promise<MapCollection<T>>
export default function<T>(tasks: Collection<AsyncSupplier<T>>): Promise<Collection<T>> {
  return mapParallelTasks(tasks, Infinity);
}
