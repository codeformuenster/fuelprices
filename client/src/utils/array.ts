export function arrayDiff(arr1: string[], arr2: string[]) {
  return arr1.filter(item => !arr2.includes(item));
}

export function symmetricArrayDiff(arr1: string[], arr2: string[]) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);

  return [
    ...arr1.filter(item => !set2.has(item)),
    ...arr2.filter(item => !set1.has(item))
  ];
}