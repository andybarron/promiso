import mapLimit = require('./mapLimit');
import { AsyncFunction, Collection } from './types';

export = <A, B>(items: Collection<A>, f: AsyncFunction<A, B>) => mapLimit(items, 1, f);
