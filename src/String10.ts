// import { z } from "zod";
import { toNumber50 } from "./Number50.js";
import { useNullish } from "./useNullish.js";
import { Brand } from "./Brand.js";

// export const String10 = z
//   .string()
//   .length(10)
//   .regex(/^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{10}$/, {
//     message: "Invalid Crockford Base32 encoded BigInt.",
//   });
// .brand("String10");

/**
 * A branded string type that represents a valid Crockford Base32 encoded string
 * of exactly 10 characters. The string must consist of characters from the
 * Crockford Base32 alphabet: "0123456789ABCDEFGHJKMNPQRSTVWXYZ".
 *
 * @type {string}
 */
export type String10 = Brand<string, "String10">;

export const CrockfordBase32Alphabet = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

export const toString10 = (s: string): String10 => {
  if (typeof s !== "string") throw new Error("toString10E1: Must be a string");
  if (s.length !== 10) throw new Error("toString10E2: Must be length 10");
  if (!/^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{10}$/.test(s))
    throw new Error("toString10E3: Must be a Crockford Base32 string");
  return s as String10;
};

export const toString10o = useNullish(toString10);

export const toNumber50_fromString10 = useNullish((s: String10): number => {
  s = toString10(s);

  let result = 0;
  for (let i = 0; i < s.length; i++) {
    const value = CrockfordBase32Alphabet.indexOf(s[i]!);
    result = result * 32 + value;
  }
  return toNumber50(result);
});

export const toString10_fromNumber50 = useNullish((n: number): String10 => {
  n = toNumber50(n);

  let result = "";
  const factor = 1 / 32;
  while (n > 0) {
    const index = Number(n & 0x1f);
    result = CrockfordBase32Alphabet[index] + result;
    n = Math.floor(n * factor);
  }
  return toString10(result.padStart(10, "0"));
});
