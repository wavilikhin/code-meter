import {
  searchFiles,
  countContentByPaths,
  generateReport,
  getContentByPath,
} from './utils';

const start = performance.now();

const searchPaths = [
  './repos/pre-refactoring/src/shared/components',
  './repos/pre-refactoring/src/pages/PDP',
  './repos/pre-refactoring/src/pages/CDP',
  './repos/pre-refactoring/src/pages/PLP',
];

try {
  const files = await searchFiles(searchPaths, {
    // fileNames: ['type.', 'types.'],
    ext: ['.tsx'],
    ignorePaths: ['.test', 'type.', 'types.', '__mocks__'],
  });

  const contentLenghByPaths = await countContentByPaths(files);

  console.log(contentLenghByPaths);

  await generateReport(contentLenghByPaths);

  const stop = performance.now();
  const inSeconds = (stop - start) / 1000;
  const rounded = Number(inSeconds).toFixed(3);
  console.log(`Script took ${rounded}s`);
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
