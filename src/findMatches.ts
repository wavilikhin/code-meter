import { findMatches } from '../utils';

interface Config {
  searchPatterns: string[];
}

export const findMatchesByPath = async (paths: string[], config: Config) => {
  const result = await findMatches(paths, config);

  return result;
};
