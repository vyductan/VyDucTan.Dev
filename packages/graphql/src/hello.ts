/** @gqlType */
type Query = unknown;

/** @gqlField */
export function hello(_: Query): string {
  return "Hello world!";
}
