
export type AsyncResult<T> = Promise<T> | T;
export type Collection<T> = Array<T> | MapCollection<T>;
export interface MapCollection<T> {
  [name: string]: T;
};

export type AsyncFunction<A, B> = (value: A) => AsyncResult<B>;
export type AsyncSupplier<T> = () => AsyncResult<T>;
