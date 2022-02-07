import { getDirsAndFilesByPath } from './';
import { SearchCriteria } from 'types';

export const searchFiles = async (
  searchPaths: string[],
  searchCriteria: SearchCriteria
) => {
  const allFiles: string[] = [];

  const getFilesByPath = async (path: string): Promise<string[]> => {
    const [dirs, files] = await getDirsAndFilesByPath(path, searchCriteria);

    allFiles.push(...files);

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
