export type Brand<T, U> = T | (T & { __brand: U });
