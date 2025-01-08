// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

/**
 * A utility function that applies a provided function to a value,
 * returning the result unless the value is null or undefined.
 *
 * @template T - The type of the input value.
 * @template R - The type of the output value.
 * @param {(v: T) => R} f - The function to apply to the input value.
 * @returns {(v: U) => U extends null ? null : U extends undefined ? undefined : R}
 *          A function that takes a value of type U (which can be T, null, or undefined)
 *          and returns either null, undefined, or the result of applying f to the value.
 *
 * @example
 * const toUpperCase = useNullish((str: string) => str.toUpperCase());
 * const result = toUpperCase("hello"); // "HELLO"
 * const nullResult = toUpperCase(null); // null
 * const undefinedResult = toUpperCase(undefined); // undefined
 */

export const useNullish =
  <T, R>(f: (v: T) => R) =>
  <U extends T | null | undefined>(
    v: U
  ): U extends null ? null : U extends undefined ? undefined : R =>
    v == null ? v : (f(v as T) as any);
