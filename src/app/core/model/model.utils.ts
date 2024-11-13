export function validateObjectProperty(
  data: Record<string, unknown>,
  propName: string,
  type: string
): boolean {
  return propName in data && typeof data[propName] === type;
}
