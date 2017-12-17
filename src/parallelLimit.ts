import { AsyncSupplier, Collection, MapCollection } from './types';
import { mapParallelTasks } from './utils';

export default function<T>(tasks: Array<AsyncSupplier<T>>, limit: number): Promise<Array<T>>
export default function<T>(tasks: MapCollection<AsyncSupplier<T>>, limit: number): Promise<MapCollection<T>>
export default function<T>(tasks: Collection<AsyncSupplier<T>>, limit: number): Promise<Collection<T>> {
  return mapParallelTasks(tasks, limit);
}
