import { test } from "node:test";
import { expect } from "expect";
import { randInt50, extractShardAndTimestampInt50 } from "./randInt50.js";

let shard = 0xffe;
let timestamp = 0x3ffffe << 7;

test("randInt50 should return a number", () => {
  const result = randInt50();
  expect(typeof result).toBe("number");
});

test("randInt50 should return a number within the range", () => {
  const result = randInt50();
  expect(result >>> 0).toBeGreaterThanOrEqual(0);
  expect(result).toBeLessThan(0x3ffffffffffff);
});

test("randInt50 should incorporate timestamp and shard correctly", () => {
  const result = randInt50(shard, timestamp);
  const expectedShard = (shard & 0xfff) << 16;
  const timestamp22 = (timestamp >> 7) & 0x3fffff;
  expect(result >> 16).toEqual(
    ((timestamp22 << (12 + 16)) | expectedShard) >> 16
  );
});

test("extractShardAndTimestampInt50 should return correct shard and timestamp", () => {
  const rand = randInt50(shard, timestamp);
  const { shard: extractedShard, timestamp: extractedTimestamp } =
    extractShardAndTimestampInt50(rand);
  expect(extractedShard).toEqual(shard & 0xfff);
  expect(timestamp).toEqual(timestamp & (0x3fffff << 7));
  expect(extractedTimestamp).toEqual(timestamp & (0x3fffff << 7));
});
