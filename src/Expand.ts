// https://stackoverflow.com/a/69288824

export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export type ExpandRecursively<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : never
  : T;

export type ExpandF<T> = T extends (...args: infer A) => infer R
  ? (...args: ExpandF<A>) => ExpandF<R>
  : Expand<T>;

export type ExpandRecursivelyF<T> = T extends (...args: infer A) => infer R
  ? (...args: ExpandRecursivelyF<A>) => ExpandRecursivelyF<R>
  : T extends object
    ? T extends infer O
      ? { [K in keyof O]: ExpandRecursivelyF<O[K]> }
      : never
    : T;
