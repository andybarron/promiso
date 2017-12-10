import parallelLimit = require('./parallelLimit');
import { AsyncFunction, AsyncSupplier, Collection } from './types';
import { mapCollection } from './utils';

export = <A, B> (items: Collection<A>, limit: number,
                 f: AsyncFunction<A, B>): Promise<Array<B>> => {
  const tasks: Array<AsyncSupplier<B>> = mapCollection(items, (item) => () => f(item));
  return parallelLimit(tasks, limit);
};
