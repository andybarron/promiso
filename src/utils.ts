import { Collection } from './types';

const reduceMerge = <T> (accum: Array<T>, target: Array<T> | T): Array<T> => {
  if (Array.isArray(target)) {
    accum.push(...target);
  } else {
    accum.push(target);
  }
  return accum;
};

export const flatten = <T> (items: Array<Array<T>>): Array<T> => items.reduce(reduceMerge, []);

export const mapCollection = <T, U> (collection: Collection<T>,
                                     f: (item: T) => U): Collection<U> => collection.map(f);
