// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { getUnixTimestamp } from "./UnixTimestamp.js";
import { randInt } from "./randInt.js";

export const randBigInt = (
  shard: number = randInt(),
  timestamp = getUnixTimestamp()
): bigint => {
  const timestamp22 = BigInt((timestamp >> 7) & 0x3fffff); // 2 minutes resolution, 16 years max
  const shard12 = BigInt(shard & 0xfff);
  const random16 = BigInt(randInt(0xffff));
  return (
    ((timestamp22 << BigInt(12 + 16)) | (shard12 << BigInt(16)) | random16) &
    mask50
  );
};

export const rand50bitInt = (
  shard: number = randInt(),
  timestamp = getUnixTimestamp()
): number => Number(randBigInt(shard, timestamp) & mask50);

const mask50 = BigInt(0x3ffffffffffff);
