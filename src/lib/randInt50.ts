import { randInt } from "./randInt.js";
import { getUnixTimestamp } from "./UnixTimestamp.js";

export const randInt50 = (
  shard: number = randInt(),
  timestamp = getUnixTimestamp()
): number => {
  const timestamp22 = (timestamp >> 7) & 0x3fffff; // 2 minutes resolution, 16 years max
  const shard12 = shard & 0xfff;
  const random16 = randInt(0xffff);
  const result =
    ((timestamp22 << (12 + 16)) | (shard12 << 16) | random16) & mask50;
  return result >>> 0;
};
export const rand50bitInt = randInt50;

const mask50 = 0x3ffffffffffff;

export const extractShardAndTimestampInt50 = (
  rand: number
): { shard: number; timestamp: number } => {
  const timestamp22 = (rand >> 28) & 0x3fffff;
  const shard = (rand >> 16) & 0xfff;
  const timestamp = timestamp22 << 7;
  return { shard, timestamp };
};
