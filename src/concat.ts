import concatLimit from './concatLimit';
import { AsyncFunction, Collection } from './types';

export default <A, B> (items: Collection<A>, f: AsyncFunction<A, Array<B>>): Promise<Array<B>> => {
  return concatLimit(items, Infinity, f);
};
