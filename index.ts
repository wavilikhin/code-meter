import { readFileSync } from 'fs';
import { SearchCriteria } from 'types';
import { findDirsAndFiles } from './utils/findDirsAndFiles';

const PROJECT_ROOT = '/Users/vvavilikhin/Dev/macys/hss';
const searchFolders = ['src/pages/PDP'];

const searchFiles = async (searchCriteria: SearchCriteria) => {
  // Проходимся рекурсивно по папкам
  //   Отсеиваем ненужное
  const [dirs, files] = await findDirsAndFiles(PROJECT_ROOT, searchFolders[0]);

  console.log(dirs, files);
};

const result = await searchFiles({ ext: '.tsx' });

const file = readFileSync(`./index.tsx`, { encoding: 'utf8' }).replace(
  /\s/g,
  ''
);
// Count occurences
console.log(file.match(/import/gm).length);
