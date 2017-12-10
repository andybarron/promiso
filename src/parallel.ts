import parallelLimit = require('./parallelLimit');
import { AsyncFunction } from './types';

export = <T>(tasks: Array<AsyncFunction<T>>) => parallelLimit(tasks, Infinity);
