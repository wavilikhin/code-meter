import {
  getFiles,
  generateReport,
  filterIngorePaths,
  getContentLength,
} from '../../utils';
import { GLOBAL_IGNORE_PATHS } from '../../constants';
import { OptionalKeys, RequiredKeys } from 'types';
const filename = new URL('', import.meta.url).pathname.split('/').at(-1);

interface Params {
  searchPaths: string[];
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
  required: ['searchPaths'],
  optional: ['fileExtensions', 'fileNames', 'ignorePaths', 'reportName'],
};

export const main = async (params: Params) => {
  const {
    searchPaths,
    fileExtensions = [],
    fileNames = [],
    ignorePaths = [],
    reportName,
  } = params;

  try {
    const filtredIgnorePaths = filterIngorePaths([
      ...ignorePaths,
      ...GLOBAL_IGNORE_PATHS,
    ]);

    const files = await getFiles(searchPaths, {
      ext: fileExtensions.filter((e) => !!e),
      ignorePaths: filtredIgnorePaths,
      fileNames: fileNames.filter((e) => !!e),
    });

    const lengthsMap = getContentLength(files);

    const lengthsCount = Object.entries(lengthsMap).reduce((curr, next) => {
      const [_, lenght] = next;
      return curr + lenght;
    }, 0);

    await generateReport(
      {
        searchPaths,
        ignorePaths: filtredIgnorePaths,
        entries: Object.keys(lengthsMap).length,
        totalCount: lengthsCount,
        data: lengthsMap,
      },
      reportName
    );

    return Promise.resolve(filename);
  } catch (error) {
    return Promise.reject(filename + '\n' + '\t' + error);
  }
};
