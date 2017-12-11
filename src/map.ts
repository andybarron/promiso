import mapLimit from './mapLimit';
import { AsyncFunction, Collection } from './types';

export default <A, B>(items: Collection<A>, f: AsyncFunction<A, B>) => mapLimit(items, Infinity, f);
