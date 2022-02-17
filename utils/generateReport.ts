import { WriteFileOptions } from 'fs';
import { writeFile } from './node';

export const generateReport = async (
  dataObject: Record<string, unknown>,
  path: string = './report.json',
  options?: WriteFileOptions
) => {
  await writeFile(path, JSON.stringify(dataObject), options);
};
