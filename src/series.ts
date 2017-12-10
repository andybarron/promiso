import parallelLimit = require('./parallelLimit');
import { AsyncSupplier } from './types';

export = <T>(tasks: Array<AsyncSupplier<T>>) => parallelLimit(tasks, 1);
