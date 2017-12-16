import { AsyncSupplier, Collection } from './types';

const reduceMerge = <T> (accum: Array<T>, target: Array<T> | T): Array<T> => {
  if (Array.isArray(target)) {
    accum.push.apply(accum, target);
  } else {
    accum.push(target);
  }
  return accum;
};

export const flatten = <T> (items: Array<Array<T>>): Array<T> => items.reduce(reduceMerge, []);

export const mapCollection = <T, U> (collection: Collection<T>,
                                     f: (item: T) => U): Collection<U> => collection.map(f);

const startThread = (tasks: Array<AsyncSupplier<void>>,
                     handle: CancelHandle): Promise<void> => {
  let p = Promise.resolve();
  tasks.forEach((task) => {
    p = p.then(task)
      .then(() => {
        if (handle.canceled) { throw new Error('canceled'); }
      });
  });
  return p;
};

export const runParallelTasks = (originalTasks: Array<AsyncSupplier<void>>,
                                 limit: number): Promise<void> => {
  const tasks = originalTasks.slice();
  const numThreads = Math.max(1, Math.min(tasks.length, limit));
  const chunkSize = Math.ceil(tasks.length / numThreads);
  const taskChunks: Array<Array<AsyncSupplier<void>>> = [];
  while (taskChunks.length < numThreads) {
    taskChunks.push(tasks.splice(0, chunkSize));
  }
  const handle: CancelHandle = {};
  const threadPromises = taskChunks.map((chunk) => startThread(chunk, handle));
  return Promise.all(threadPromises)
    .then(() => undefined)
    .catch((error) => {
      handle.canceled = true;
      throw error;
    });
};

interface CancelHandle {
  canceled?: boolean;
}
