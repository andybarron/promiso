import { Collection } from './types';

export const mapCollection = <T, U> (collection: Collection<T>,
                                     f: (item: T) => U): Collection<U> => collection.map(f);
