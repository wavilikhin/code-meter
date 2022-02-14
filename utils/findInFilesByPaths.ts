import { getContentByPath } from './getContentByPath';

interface Config {
  searchPatterns: string[];
}

export const findInFilesByPaths = async (paths: string[], config: Config) => {
  const contentLengthMap: Record<string, number> = {};

  for (const path of paths) {
    const content = await getContentByPath(path);
    // loop through searchPatterns ??
    contentLengthMap[path] = content.length;
  }

  return contentLengthMap;
};
