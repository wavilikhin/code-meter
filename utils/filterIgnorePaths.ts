export const filterIngorePaths = (paths: string[]) => {
  const filtred = paths.filter((p) => !!p);
  return [...new Set(filtred)];
};
