import { z } from "zod";
import { toNumber50 } from "./Number50.js";
import { useNullish } from "./useNullish.js";
import { Brand } from "./Brand.js";

// export const String7 = z.string().brand("String7");
export type String7 = Brand<string, "String7">;
// export type String7 = z.infer<typeof String7>;

export const toString7 = (s: string): String7 => {
  if (s === undefined) return undefined as any;

  if (typeof s !== "string")
    throw new Error("toString7E1: Must be a string: " + typeof s);
  if (s.length !== 7 && s.length !== 8)
    throw new Error("toString7E2: Must be length 7 or 8");
  if (!/^[0-9a-z]*$/.test(s))
    throw new Error("toString7E3: Must be base 36 alphanumeric lowercase");
  return s as String7;
};
export const toString7o = useNullish(toString7);

export const toNumber50_fromString7 = useNullish((s: String7): number => {
  s = toString7(s);
  return parseInt(s, 36);
});

export const toString7_fromNumber50 = useNullish((n: number): String7 => {
  n = toNumber50(n);
  return toString7(n.toString(36).toLowerCase().padStart(7, "0"));
});
