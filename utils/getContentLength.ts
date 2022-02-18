import { getContentByPath } from './getContentByPath';

export const getContentLength = async (paths: string[]) => {
  const contentLengthMap: Record<string, number> = {};

  for (const path of paths) {
    const content = await getContentByPath(path);
    contentLengthMap[path] = content.length;
  }

  return contentLengthMap;
};
