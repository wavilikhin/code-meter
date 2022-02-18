export const countMedianValue = (values: number[]): number => {
  if (!values.length) {
    return;
  }

  if (values.length === 2) {
    return (values[0] + values[1]) / 2;
  }

  const sorted = values.sort((a, b) => a - b);

  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle] + sorted[middle + 1]) / 2;
  }

  return sorted[middle];
};
