import { strict as assert } from "assert";
import fc from "fast-check";
import { describe, it } from "node:test";
import {
  toNumber50_fromString7,
  toString7,
  toString7_fromNumber50,
} from "./String7.js";

// Number50 is 50 bits
// String7 is 7 chars base 36

const base36LowercaseGenerator = fc
  .array(fc.integer({ min: 0, max: 35 }), {
    minLength: 7,
    maxLength: 7,
  })
  .map((indices) =>
    toString7(indices.map((index) => index.toString(36)).join("")),
  );

describe("String7", () => {
  describe("toNumber50_fromString7", () => {
    it("should convert valid 7-character lowercase base36 strings to numbers", () => {
      fc.assert(
        fc.property(base36LowercaseGenerator, (str) => {
          const result = toNumber50_fromString7(str);
          assert(typeof result === "number");
        }),
      );
    });

    it("should throw an error for strings that are not 7 characters long", () => {
      fc.assert(
        fc.property(
          fc.oneof(fc.string({ minLength: 8 }), fc.string({ maxLength: 6 })),
          (str) => {
            assert.throws(() => toNumber50_fromString7(str as any), {
              message: "toString7E2: Must be length 7",
            });
          },
        ),
      );
    });

    it("should throw an error for non-string input (except null or undefined)", () => {
      fc.assert(
        fc.property(fc.anything(), (input) => {
          if (
            typeof input !== "string" &&
            input !== null &&
            input !== undefined
          ) {
            assert.throws(() => toNumber50_fromString7(input as any), {
              message: "toString7E1: Must be a string",
            });
          }
        }),
      );
    });

    it("should return null for null input", () => {
      const result = toNumber50_fromString7(null);
      assert.strictEqual(result, null);
    });

    it("should return undefined for undefined input", () => {
      const result = toNumber50_fromString7(undefined);
      assert.strictEqual(result, undefined);
    });

    it("should return original string when converting and then unconverting", () => {
      fc.assert(
        fc.property(base36LowercaseGenerator, (str) => {
          const number = toNumber50_fromString7(str);
          const result = toString7_fromNumber50(number);
          assert.strictEqual(result, str);
        }),
      );
    });
  });

  describe("toString7_fromNumber50", () => {
    it("should convert non-negative numbers to 7-character strings", () => {
      fc.assert(
        fc.property(fc.integer({ min: 0 }), (num) => {
          const result = toString7_fromNumber50(num);
          assert(typeof result === "string" && result.length === 7);
        }),
      );
    });

    it("should throw an error for negative numbers", () => {
      fc.assert(
        fc.property(fc.integer({ max: -1 }), (num) => {
          assert.throws(() => toString7_fromNumber50(num), {
            message: "toNumber50E2: Must be non-negative",
          });
        }),
      );
    });

    it("should throw an error for non-number input", () => {
      fc.assert(
        fc.property(fc.anything(), (input) => {
          if (
            typeof input !== "number" &&
            input !== null &&
            input !== undefined
          ) {
            assert.throws(() => toString7_fromNumber50(input as any), {
              message: "toNumber50E1: Must be a number",
            });
          }
        }),
      );
    });

    it("should return null for null input", () => {
      const result = toString7_fromNumber50(null);
      assert.strictEqual(result, null);
    });

    it("should return undefined for undefined input", () => {
      const result = toString7_fromNumber50(undefined);
      assert.strictEqual(result, undefined);
    });

    it("should return original number when converting and then unconverting", () => {
      fc.assert(
        fc.property(fc.integer({ min: 0 }), (num) => {
          const str = toString7_fromNumber50(num);
          const result = toNumber50_fromString7(str);
          assert.strictEqual(result, num);
        }),
      );
    });
  });
});
