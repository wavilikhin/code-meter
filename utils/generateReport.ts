import { writeFile as wf, WriteFileOptions } from 'fs';
import { promisify } from 'util';
const writeFile = promisify(wf);

export const generateReport = async (
  dataObject: Record<string, unknown>,
  path: string = './report.json',
  options?: WriteFileOptions
) => {
  await writeFile(path, JSON.stringify(dataObject), options);
};
