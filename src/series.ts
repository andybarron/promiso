import parallelLimit from './parallelLimit';
import { AsyncSupplier } from './types';

export default <T>(tasks: Array<AsyncSupplier<T>>) => parallelLimit(tasks, 1);
