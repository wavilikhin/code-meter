import { searchFiles, generateReport, findMatches } from '../../utils';
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
    reportName = 'matches.json',
  } = params;

  try {
    const files = await searchFiles(searchPaths, {
      ext: fileExtensions,
      //   REFACTOR: Make sure its unique vlaues arr
      ignorePaths: [...ignorePaths, ...GLOBAL_IGNORE_PATHS],
      fileNames,
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
        data: matches,
        entries: Object.keys(matches).length,
        totalCount: matchesCount,
        searchPaths,
        ignorePaths,
      },
      reportName
    );

    return Promise.resolve();
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
