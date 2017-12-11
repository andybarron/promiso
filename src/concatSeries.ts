import concatLimit = require('./concatLimit');
import { AsyncFunction, Collection } from './types';

export = <A, B> (items: Collection<A>, f: AsyncFunction<A, Array<B>>): Promise<Array<B>> => {
  return concatLimit(items, 1, f);
};
