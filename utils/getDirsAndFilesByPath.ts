import { SearchCriteria } from 'types';
import { extname } from 'path';
import { readdir, stat } from './node';

export const getDirsAndFilesByPath = async (
  searchPath: string,
  searchCriteria: SearchCriteria
) => {
  const { ignorePaths } = searchCriteria;

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
      searchCriteria.ext.length &&
      !searchCriteria.ext.some((e) => e === extname(filePath))
    ) {
      continue;
    }

    if (
      searchCriteria.fileNames.length &&
      !searchCriteria.fileNames.some((n) => filePath.split('/').at(-1).match(n))
    ) {
      continue;
    }

    if (
      searchCriteria.ignorePaths.length &&
      searchCriteria.ignorePaths.some((p) => filePath.match(p))
    ) {
      continue;
    }

    files.push(filePath);
  }
  return [dirs, files];
};
