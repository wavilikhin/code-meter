import {
  searchFiles,
  generateReport,
  parseArgs,
  findMatches,
} from '../../utils';
import { GLOBAL_IGNORE_PATHS } from '../../constants';

export const params = {
  required: ['searchPaths', 'searchPatterns'],
  optional: ['fileExtensions', 'fileNames', 'ignorePaths', 'reportName'],
};

const args = parseArgs();

const searchPaths = args.find((arg) => arg.name === 'searchPaths')?.values || [
  './repos/pre-refactoring/src',
];
const searchPatterns = args.find((arg) => arg.name === 'searchPatterns')
  ?.values || [': any'];

const ext = args.find((arg) => arg.name === 'ext')?.values || [];
const fileNames = args.find((arg) => arg.name === 'fileNames')?.values || [];

const ignorePaths = args.find((arg) => arg.name === 'ignorePaths')?.values
  ? [
      ...args.find((arg) => arg.name === 'ignorePaths').values,
      ...GLOBAL_IGNORE_PATHS,
    ]
  : GLOBAL_IGNORE_PATHS;
const reportName =
  args.find((arg) => arg.name === 'reportName')?.values[0] || 'matches.json';

try {
  const files = await searchFiles(searchPaths, {
    ext,
    ignorePaths,
    fileNames,
  });

  const matches = await findMatches(files, {
    searchPatterns,
  });

  console.log('matches: ', matches);

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
} catch (error) {
  console.error(error);
  throw new Error(error);
}
