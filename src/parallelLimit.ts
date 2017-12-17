import { AsyncSupplier, Collection, MapObject } from './types';
import { mapParallelTasks } from './utils';

export default function<T>(tasks: Array<AsyncSupplier<T>>, limit: number): Promise<Array<T>>;
export default function<T>(tasks: MapObject<AsyncSupplier<T>>,
                           limit: number): Promise<MapObject<T>>;
export default function<T>(tasks: Collection<AsyncSupplier<T>>,
                           limit: number): Promise<Collection<T>> {
  return mapParallelTasks(tasks, limit);
}
