import { test } from "node:test";
import { expect } from "expect";
import {
  rand50bitInt,
  extractShardAndTimestamp50BitInt,
} from "./rand50bitInt.js";

let shard = 0xffe;
let timestamp = 0x3ffffe << 7;

test("rand50bitInt should return a number", () => {
  const result = rand50bitInt();
  expect(typeof result).toBe("number");
});

test("rand50bitInt should return a number within the range", () => {
  const result = rand50bitInt();
  expect(result >>> 0).toBeGreaterThanOrEqual(0);
  expect(result).toBeLessThan(0x3ffffffffffff);
});

test("rand50bitInt should incorporate timestamp and shard correctly", () => {
  const result = rand50bitInt(shard, timestamp);
  const expectedShard = (shard & 0xfff) << 16;
  const timestamp22 = (timestamp >> 7) & 0x3fffff;
  expect(result >> 16).toEqual(
    ((timestamp22 << (12 + 16)) | expectedShard) >> 16
  );
});

test("extractShardAndTimestamp should return correct shard and timestamp", () => {
  const rand = rand50bitInt(shard, timestamp);
  const { shard: extractedShard, timestamp: extractedTimestamp } =
    extractShardAndTimestamp50BitInt(rand);
  expect(extractedShard).toEqual(shard & 0xfff);
  expect(timestamp).toEqual(timestamp & (0x3fffff << 7));
  expect(extractedTimestamp).toEqual(timestamp & (0x3fffff << 7));
});
