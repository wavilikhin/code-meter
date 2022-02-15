import { readFile as rf } from 'fs';
import { promisify } from 'util';

const readFile = promisify(rf);

export const getContentByPath = async (path: string) => {
  const fileContent = await readFile(path, 'utf-8');

  return fileContent;
};
