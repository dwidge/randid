import { test } from "node:test";
import { expect } from "expect";
import { randInt64, extractShardAndTimestampInt64 } from "./randInt64.js";

let shard = 0xffe;
let timestamp = 0x3ffffe << 7;

test("randInt64 should return a bigint", () => {
  const result = randInt64();
  expect(typeof result).toBe("bigint");
});

test("randInt64 should incorporate timestamp and shard correctly", () => {
  const result = randInt64(shard, timestamp);
  const expectedShard = BigInt(shard & 0xfff) << BigInt(16);
  const timestamp22 = BigInt((timestamp >> 7) & 0x3fffff);
  expect(result >> 16n).toEqual(
    ((timestamp22 << BigInt(12 + 16)) | expectedShard) >> 16n
  );
});

test("extractShardAndTimestampInt64 should return correct shard and timestamp", () => {
  const rand = randInt64(shard, timestamp);
  const { shard: extractedShard, timestamp: extractedTimestamp } =
    extractShardAndTimestampInt64(rand);
  expect(extractedShard).toEqual(shard & 0xfff);
  expect(extractedTimestamp).toEqual(timestamp & (0x3fffff << 7));
});
