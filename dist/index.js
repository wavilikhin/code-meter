import { searchFiles, generateReport } from './utils';
const searchPaths = [
    './repos/pre-refactoring/src/shared/components',
    './repos/pre-refactoring/src/pages/PDP',
    './repos/pre-refactoring/src/pages/CDP',
    './repos/pre-refactoring/src/pages/PLP',
];
try {
    const files = await searchFiles(searchPaths, {
        ext: ['.tsx'],
        ignorePaths: ['.test', 'type.', 'types.', '__mocks__'],
    });
    await generateReport(files);
    process.exit(0);
}
catch (error) {
    console.error(error);
    process.exit(1);
}
//# sourceMappingURL=index.js.map