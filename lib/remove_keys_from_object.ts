export function removeKeys<T extends Record<string, any>>(
  hit: T,
  additionalKeys: string[] = [],
): Partial<T> {
  const result: Record<string, any> = {};

  for (const key in hit) {
    if (hit.hasOwnProperty(key)) {
      //   if (key.startsWith("_")) {
      //     continue;
      //   }
      if (additionalKeys.includes(key)) {
        continue;
      }
      result[key] = hit[key];
    }
  }
  return result as Partial<T>;
}
