import parallelLimit = require('./parallelLimit');
import { AsyncFunction } from './types';

export = <T>(tasks: AsyncFunction<T>[]): Promise<T[]> => {
  return parallelLimit(tasks, Infinity);
};
