import parallelLimit from './parallelLimit';
import { AsyncFunction, AsyncSupplier, Collection } from './types';
import { mapCollection } from './utils';

export default <A, B> (items: Collection<A>, limit: number,
                       f: AsyncFunction<A, B>): Promise<Array<B>> => {
  const tasks: Array<AsyncSupplier<B>> = mapCollection(items, (item) => () => f(item));
  return parallelLimit(tasks, limit);
};
