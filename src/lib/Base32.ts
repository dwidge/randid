// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { z } from "zod";
import { randInt50 } from "./randInt50.js";

export const Base32Alphabet = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

export const Base32 = z
  .string()
  .length(10)
  .regex(/^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{10}$/, {
    message: "Invalid Crockford Base32 encoded BigInt.",
  });
export type Base32 = z.infer<typeof Base32>;

export const fromBase32 = (base32Str: Base32): number => {
  base32Str = Base32.parse(base32Str);
  let result = 0;
  for (let i = 0; i < base32Str.length; i++) {
    const value = Base32Alphabet.indexOf(base32Str[i]!);
    result = result * 32 + value;
  }
  return result;
};

export const toBase32 = (value: number): Base32 => {
  let result = "";
  while (value > 0) {
    const index = Number(value & 0x1f);
    result = Base32Alphabet[index] + result;
    value = value >>> 5;
  }
  return Base32.parse(result.padStart(10, "0"));
};

export const randBase32 = (): Base32 => toBase32(randInt50());

export const Base32BigInt = z.union([Base32.transform(fromBase32), z.number()]);
export type Base32BigInt = z.infer<typeof Base32BigInt>;

export const BigIntBase32 = z.union([Base32, z.number().transform(toBase32)]);
export type BigIntBase32 = z.infer<typeof BigIntBase32>;
