import { strict as assert } from "assert";
import fc from "fast-check";
import { describe, it } from "node:test";
import {
  CrockfordBase32Alphabet,
  toNumber50_fromString10,
  toString10,
  toString10_fromNumber50,
} from "./String10.js";

// Number50 is 50 bits
// String10 is 10 chars base 32

const base32UppercaseGenerator = fc
  .array(fc.integer({ min: 0, max: CrockfordBase32Alphabet.length - 1 }), {
    minLength: 10,
    maxLength: 10,
  })
  .map((indices) =>
    toString10(indices.map((index) => CrockfordBase32Alphabet[index]).join("")),
  );

describe("String10", () => {
  describe("toNumber50_fromString10", () => {
    it("should convert valid 10-character uppercase base32 strings to numbers", () => {
      fc.assert(
        fc.property(base32UppercaseGenerator, (str) => {
          const result = toNumber50_fromString10(str);
          assert(typeof result === "number");
        }),
      );
    });

    it("should throw an error for strings that are not 10 characters long", () => {
      fc.assert(
        fc.property(
          fc.oneof(fc.string({ minLength: 11 }), fc.string({ maxLength: 9 })),
          (str) => {
            assert.throws(() => toNumber50_fromString10(str as any), {
              message: "toString10E2: Must be length 10",
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
            assert.throws(() => toNumber50_fromString10(input as any), {
              message: "toString10E1: Must be a string",
            });
          }
        }),
      );
    });

    it("should return null for null input", () => {
      const result = toNumber50_fromString10(null);
      assert.strictEqual(result, null);
    });

    it("should return undefined for undefined input", () => {
      const result = toNumber50_fromString10(undefined);
      assert.strictEqual(result, undefined);
    });

    it("should return original string when converting and then unconverting", () => {
      fc.assert(
        fc.property(base32UppercaseGenerator, (str) => {
          const number = toNumber50_fromString10(str);
          const result = toString10_fromNumber50(number);
          assert.strictEqual(result, str);
        }),
      );
    });
  });

  describe("toString10_fromNumber50", () => {
    it("should convert non-negative numbers to 10-character strings", () => {
      fc.assert(
        fc.property(fc.integer({ min: 0 }), (num) => {
          const result = toString10_fromNumber50(num);
          assert(typeof result === "string" && result.length === 10);
        }),
      );
    });

    it("should throw an error for negative numbers", () => {
      fc.assert(
        fc.property(fc.integer({ max: -1 }), (num) => {
          assert.throws(() => toString10_fromNumber50(num), {
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
            assert.throws(() => toString10_fromNumber50(input as any), {
              message: "toNumber50E1: Must be a number",
            });
          }
        }),
      );
    });

    it("should return null for null input", () => {
      const result = toString10_fromNumber50(null);
      assert.strictEqual(result, null);
    });

    it("should return undefined for undefined input", () => {
      const result = toString10_fromNumber50(undefined);
      assert.strictEqual(result, undefined);
    });

    it("should return original number when converting and then unconverting", () => {
      fc.assert(
        fc.property(fc.integer({ min: 0 }), (num) => {
          const str = toString10_fromNumber50(num);
          const result = toNumber50_fromString10(str);
          assert.strictEqual(result, num);
        }),
      );
    });
  });
});
