import mapLimit from './mapLimit';
import { AsyncFunction, Collection } from './types';
import { flatten } from './utils';

export default <A, B> (items: Collection<A>, limit: number,
                       f: AsyncFunction<A, Array<B>>): Promise<Array<B>> => {
  return mapLimit(items, limit, f).then(flatten);
};
