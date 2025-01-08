// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { z } from "zod";
import { randInt50 } from "./randInt50.js";
import {
  toNumber50_fromString10,
  toString10,
  toString10_fromNumber50,
} from "./String10.js";
import { toString7 } from "./String7.js";
import { makeZodType } from "./makeZodType.js";

export const zString10 = makeZodType(toString10);
export const zString7 = makeZodType(toString7);

export const Base32 = zString10;
export type Base32 = z.infer<typeof Base32>;

export const fromBase32 = (v: any) => toNumber50_fromString10(v);

export const toBase32 = toString10_fromNumber50;

export const randBase32 = (): Base32 => toBase32(randInt50());

export const Base32BigInt = z.union([Base32.transform(fromBase32), z.number()]);
export type Base32BigInt = z.infer<typeof Base32BigInt>;

export const BigIntBase32 = z.union([Base32, z.number().transform(toBase32)]);
export type BigIntBase32 = z.infer<typeof BigIntBase32>;
