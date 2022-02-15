import { findMatchesByPath } from './src/findMatches';
import { searchFiles, generateReport, parseArgs } from './utils';
import { GLOBAL_IGNORE_PATHS } from './constants';

const start = performance.now();

const args = parseArgs();

const searchPaths =
  args.find((arg) => arg.name === 'searchPaths')?.values || [];
const searchPatterns =
  args.find((arg) => arg.name === 'searchPatterns')?.values || [];
const ext = args.find((arg) => arg.name === 'ext')?.values || [];
const fileNames = args.find((arg) => arg.name === 'fileNames')?.values || [];
const ignorePaths =
  [
    ...args.find((arg) => arg.name === 'fileNames')?.values,
    ...GLOBAL_IGNORE_PATHS,
  ] || GLOBAL_IGNORE_PATHS;
const reportName =
  args.find((arg) => arg.name === 'reportName')?.values[0] || 'matches.json';

try {
  const files = await searchFiles(searchPaths, {
    ext,
    ignorePaths,
    fileNames,
  });

  const matches = await findMatchesByPath(files, {
    searchPatterns,
  });

  let filtred: Record<string, number> = {};
  //   Refactor to loop through all dyanmic keys
  for (const key of Object.keys(matches)) {
    if (matches[key][': any']) {
      filtred[key] = matches[key][': any'];
    }
  }

  const totalCount = Object.entries(filtred).reduce((curr, next) => {
    return curr + next[1];
  }, 0);

  await generateReport(
    {
      data: filtred,
      entries: Object.keys(filtred).length,
      totalCount,
      searchPaths,
      ignorePaths,
    },
    reportName
  );

  const stop = performance.now();
  const inSeconds = (stop - start) / 1000;
  const rounded = Number(inSeconds).toFixed(3);
  console.log(`Finded ${Object.keys(filtred).length} matches in ${rounded}s`);
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
