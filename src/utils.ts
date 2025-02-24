export const formatCurrency = (price: number) => {
  return new Intl.NumberFormat("vn-VI", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export const splitPathWithDefault = (path: string, defaultValue: any) => {
  if (!path) return;
  return [...path.split("/"), defaultValue];
};

export const createNestedObject = (keys: any[]) => {
  if (!keys) return;
  return keys.slice(0, -1).reduceRight((acc: any, key) => {
    return { [key]: acc };
  }, keys[keys.length - 1]);
};

export const insertNestedPath = (
  pathArray: any[] | undefined,
  target: Record<string, any>,
  index = 0
) => {
  if (!pathArray) return;

  if (!target[pathArray[index]] || index === pathArray.length - 1) {
    try {
      target[pathArray[index]] = createNestedObject(pathArray.slice(index + 1));
    } catch (error) {}
    return;
  }

  insertNestedPath(pathArray, target[pathArray[index]], index + 1);
};
