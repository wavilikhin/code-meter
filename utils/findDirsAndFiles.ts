import { readdir as rd, stat as st } from 'fs';
import { promisify } from 'util';

const readdir = promisify(rd);
const stat = promisify(st);

export const findDirsAndFiles = async (root: string, searchPath: string) => {
  const allFiles = await readdir(`${root}/${searchPath}`);

  const allFilesPaths = allFiles.map((file) => `${root}/${searchPath}/${file}`);

  const dirs: string[] = [];

  for (const filePath of allFilesPaths) {
    const fileStats = await stat(filePath);
    if (fileStats.isDirectory()) {
      dirs.push(filePath);
    }
  }

  const files = allFilesPaths.filter(
    (filePath) => !dirs.some((p) => p === filePath)
  );

  return [dirs, files];
};
