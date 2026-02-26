// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { z } from "zod";

export const UnixTimestamp = z.coerce.number().int().nonnegative();
export type UnixTimestamp = z.infer<typeof UnixTimestamp>;

export const getUnixTimestamp = (date: string | number | Date = Date.now()) =>
  (new Date(date).getTime() / 1000) | 0;
