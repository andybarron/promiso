
export type AsyncResult<T> = Promise<T> | T;
export type Collection<T> = Array<T>;

export type AsyncFunction<A, B> = (value: A) => AsyncResult<B>;
export type AsyncSupplier<T> = () => AsyncResult<T>;
