import { WriteFileOptions } from 'fs';
import { writeFile } from './node';

export const generateReport = async (
  dataObject: Record<string, unknown>,
  name: string,
  options?: WriteFileOptions
) => {
  await writeFile(
    `./${name || 'report'}.json`,
    JSON.stringify(dataObject),
    options
  );
};
