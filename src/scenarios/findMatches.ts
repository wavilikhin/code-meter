import {
  getFiles,
  generateReport,
  findMatches,
  filterIngorePaths,
} from '../../utils';
import { GLOBAL_IGNORE_PATHS } from '../../constants';
import { OptionalKeys, RequiredKeys } from 'types';
interface Params {
  searchPaths: string[];
  searchPatterns: string[];
  fileExtensions?: string[];
  fileNames?: string[];
  ignorePaths?: string[];
  reportName?: string;
}
interface InputParams {
  required: Array<RequiredKeys<Params>>;
  optional?: Array<OptionalKeys<Params>>;
}

export const inputParams: InputParams = {
  required: ['searchPaths', 'searchPatterns'],
  optional: ['fileExtensions', 'fileNames', 'ignorePaths', 'reportName'],
};

export const main = async (params: Params) => {
  const {
    searchPaths,
    searchPatterns,
    fileExtensions = [],
    fileNames = [],
    ignorePaths = [],
    reportName,
  } = params;

  try {
    const filtredIgnorePaths = filterIngorePaths([
      ...ignorePaths,
      ...GLOBAL_IGNORE_PATHS,
    ]);
    const files = await getFiles(searchPaths, {
      ext: fileExtensions.filter((e) => !!e),
      ignorePaths: filtredIgnorePaths,
      fileNames: fileNames.filter((e) => !!e),
    });

    const matches = await findMatches(files, {
      searchPatterns,
    });

    const matchesCount = Object.entries(matches).reduce((matches, next) => {
      const [pattern, occurences] = Object.entries(next[1])[0];

      matches[pattern]
        ? (matches[pattern] += occurences)
        : (matches[pattern] = occurences);

      return matches;
    }, {} as Record<string, number>);

    await generateReport(
      {
        searchPaths,
        ignorePaths: filtredIgnorePaths,
        searchPatterns,
        entries: Object.keys(matches).length,
        totalCount: matchesCount,
        data: matches,
      },
      reportName
    );

    return Promise.resolve();
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
