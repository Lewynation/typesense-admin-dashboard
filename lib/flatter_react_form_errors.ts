export const flattenReactFormErrors = (errors: any, prefix = ""): string[] => {
  let result: string[] = [];

  Object.keys(errors).forEach((key) => {
    const path = prefix ? `${prefix}.${key}` : key;

    if (errors[key]?.message) {
      result.push(`- (${path}) ${errors[key].message}`);
    } else if (typeof errors[key] === "object") {
      result = [...result, ...flattenReactFormErrors(errors[key], path)];
    }
  });

  return result;
};
