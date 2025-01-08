import { z } from "zod";

export const makeZodType = <TInput, TOutput>(
  parser: (input: TInput) => TOutput,
) =>
  z.preprocess(
    (val) => parser(val as TInput),
    z.custom<TOutput>((val): val is TOutput => true),
  );
