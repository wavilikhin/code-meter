import { SearchCriteria } from 'types';
import { findDirsAndFiles } from './';
import { extname } from 'path';

const defaultIgnorePaths = ['node_modules', 'dist'];

export const searchFiles = async (
  searchPaths: string[],
  searchCriteria: SearchCriteria
) => {
  const ignorePaths = [...searchCriteria.ignorePaths, ...defaultIgnorePaths];
  const allFiles: string[] = [];

  const getFilesByPath = async (path: string): Promise<string[]> => {
    const [dirs, files] = await findDirsAndFiles(path);

    const filtred = files
      .filter((path) => searchCriteria.ext.some((e) => e === extname(path)))
      .filter((path) => {
        for (const ignorePath of ignorePaths) {
          if (path.match(ignorePath)) {
            return false;
          }
        }
        return path;
      });

    allFiles.push(...filtred);

    if (!dirs.length) {
      return;
    }

    for (const dir of dirs) {
      await getFilesByPath(dir);
    }
  };

  for (const searchPath of searchPaths) {
    await getFilesByPath(searchPath);
  }

  return allFiles;
};
