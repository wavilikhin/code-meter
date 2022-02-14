export const countMedianValue = (values: number[]): number => {
  const sorted = values.sort((a, b) => a - b);

  const middle = Math.ceil(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle] + sorted[middle + 1]) / 2;
  }

  return sorted[middle];
};
