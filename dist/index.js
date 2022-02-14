import { findMatchesByPath } from './src/findMatches';
import { searchFiles, generateReport } from './utils';
const start = performance.now();
const searchPaths = ['./repos'];
// const searchPaths = [
//   './repos/pre-refactoring/src/shared/components',
//   './repos/pre-refactoring/src/pages/PDP',
//   './repos/pre-refactoring/src/pages/CDP',
//   './repos/pre-refactoring/src/pages/PLP',
// ];
try {
    const files = await searchFiles(searchPaths, {
        ext: ['.tsx', '.ts'],
        ignorePaths: ['__mocks__'],
    });
    const matches = await findMatchesByPath(files, {
        searchPatterns: [':any'],
    });
    let filtred = {};
    for (const key of Object.keys(matches)) {
        if (matches[key][':any'] > 0) {
            //   @ts-ignore
            filtred[key] = matches[key][':any'];
        }
    }
    await generateReport(filtred, 'matches.json');
    const stop = performance.now();
    const inSeconds = (stop - start) / 1000;
    const rounded = Number(inSeconds).toFixed(3);
    console.log(`Script took ${rounded}s`);
    process.exit(0);
}
catch (error) {
    console.error(error);
    process.exit(1);
}
//# sourceMappingURL=index.js.map