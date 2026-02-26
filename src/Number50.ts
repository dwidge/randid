export const toNumber50 = (n: number): number => {
  if (typeof n !== "number") throw new Error("toNumber50E1: Must be a number");
  if (n < 0) throw new Error("toNumber50E2: Must be non-negative");
  if (n > 2 ** 50) throw new Error("toNumber50E3: Must be max 50 bits");
  return n;
};
