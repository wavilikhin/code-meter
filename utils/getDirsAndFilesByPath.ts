import { SearchCriteria } from 'types';
import { readdir as rd, stat as st } from 'fs';
import { promisify } from 'util';
import { extname } from 'path';
import { GLOBAL_IGNORE_PATHS } from '../constants';

const readdir = promisify(rd);
const stat = promisify(st);

export const getDirsAndFilesByPath = async (
  searchPath: string,
  searchCriteria: SearchCriteria
) => {
  const ignorePaths = searchCriteria.ignorePaths
    ? [...searchCriteria.ignorePaths, ...GLOBAL_IGNORE_PATHS]
    : GLOBAL_IGNORE_PATHS;

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

    if (
      searchCriteria.ext &&
      !searchCriteria.ext.some((e) => e === extname(filePath))
    ) {
      continue;
    }

    if (
      searchCriteria.fileNames &&
      !searchCriteria.fileNames.some((n) => filePath.split('/').at(-1).match(n))
    ) {
      continue;
    }

    if (
      searchCriteria.ignorePaths &&
      searchCriteria.ignorePaths.some((p) => filePath.match(p))
    ) {
      continue;
    }

    files.push(filePath);
  }

  return [dirs, files];
};
