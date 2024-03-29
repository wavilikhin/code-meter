import { getContentByPath } from './getContentByPath';

interface Config {
  searchPatterns: string[];
}

export const findMatches = async (paths: string[], config: Config) => {
  const contentLengthMap: Record<string, Record<string, number>> = {};

  for (const path of paths) {
    const content = await getContentByPath(path);

    for (const searchPattern of config.searchPatterns) {
      const matches = content.match(
        // new RegExp('\\b' + searchPattern + '\\b', 'gm')
        new RegExp(searchPattern, 'gm')
      );

      if (!!matches) {
        if (!contentLengthMap[path]) {
          contentLengthMap[path] = {};
        }

        Object.assign(contentLengthMap[path], {
          [searchPattern]: matches.length,
        });
      }
    }
  }

  return contentLengthMap;
};
