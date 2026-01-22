export const tryParse = (payload: unknown) => {
  let output = payload;
  try {
    output = JSON.parse(output as string);
  } catch (error) {}
  return output;
};

export const tryStringify = (payload: unknown) => {
  let output = payload;
  try {
    if (typeof output === "string") return output;
    output = JSON.stringify(output);
  } catch (error) {}
  return output;
};
