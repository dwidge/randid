import { test } from "node:test";
import { expect } from "expect";
import { randBigInt, extractShardAndTimestampBigInt } from "./randBigInt.js";

let shard = 0xffe;
let timestamp = 0x3ffffe << 7;

test("randBigInt should return a bigint", () => {
  const result = randBigInt();
  expect(typeof result).toBe("bigint");
});

test("randBigInt should incorporate timestamp and shard correctly", () => {
  const result = randBigInt(shard, timestamp);
  const expectedShard = BigInt(shard & 0xfff) << BigInt(16);
  const timestamp22 = BigInt((timestamp >> 7) & 0x3fffff);
  expect(result >> 16n).toEqual(
    ((timestamp22 << BigInt(12 + 16)) | expectedShard) >> 16n
  );
});

test("extractShardAndTimestamp should return correct shard and timestamp", () => {
  const rand = randBigInt(shard, timestamp);
  const { shard: extractedShard, timestamp: extractedTimestamp } =
    extractShardAndTimestampBigInt(rand);
  expect(extractedShard).toEqual(shard & 0xfff);
  expect(extractedTimestamp).toEqual(timestamp & (0x3fffff << 7));
});
