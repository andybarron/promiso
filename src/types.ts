
export type AsyncFunction<A, B> = (value: A) => Promise<B>;
export type AsyncSupplier<T> = () => Promise<T>;
export type Collection<T> = Array<T>;
