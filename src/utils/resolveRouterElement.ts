export function resolveRouterElement(
  element: string | string[] | undefined,
  defaultValue: string
): string {
  return Array.isArray(element) ? element[0] : element || defaultValue;
}
