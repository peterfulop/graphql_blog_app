export const reduceObjectNulls = (object: Record<string, unknown>) => {
  return Object.entries(object)
    .filter((f) => f[1])
    .reduce((obj, key) => {
      obj[key[0]] = key[1];
      return obj;
    }, {} as Record<string, unknown>);
};
