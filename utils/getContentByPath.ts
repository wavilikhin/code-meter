import { readFile } from './node';

export const getContentByPath = async (path: string) => {
  const fileContent = await readFile(path, 'utf-8');

  return fileContent;
};
