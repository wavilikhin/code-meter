import { SearchCriteria } from 'types';
import { readdir as rd, stat as st } from 'fs';
import { promisify } from 'util';
import { extname } from 'path';

const readdir = promisify(rd);
const stat = promisify(st);

const defaultIgnorePaths = ['node_modules', 'dist'];

export const getDirsAndFilesByPath = async (
  searchPath: string,
  searchCriteria: SearchCriteria
) => {
  const ignorePaths = [...searchCriteria.ignorePaths, ...defaultIgnorePaths];

  for (const path of ignorePaths) {
    if (searchPath.match(path)) {
      return [[], []];
    }
  }

  const allFiles = await readdir(`${searchPath}`);

  const allFilesPaths = allFiles.map((file) => `${searchPath}/${file}`);

  const dirs: string[] = [];
  const files: string[] = [];

  for (const filePath of allFilesPaths) {
    const fileStats = await stat(filePath);

    if (fileStats.isDirectory()) {
      dirs.push(filePath);
      continue;
    }

    if (!searchCriteria.ext.some((e) => e === extname(filePath))) {
      continue;
    }

    if (searchCriteria.ignorePaths.some((p) => filePath.match(p))) {
      continue;
    }

    files.push(filePath);
  }

  return [dirs, files];
};
