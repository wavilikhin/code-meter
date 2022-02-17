// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// export const __filename = fileURLToPath(import.meta.url);
// export const __dirname = dirname(__filename);

// console.log('root: ', __filename);
// console.log('root: ', __dirname);
// REFACTOR: make it work
export const __filename = async () => {
  const { fileURLToPath } = await import('url');
  return fileURLToPath(import.meta.url);
};

export const __dirname = async () => {
  const { fileURLToPath } = await import('url');
  const filename = fileURLToPath(import.meta.url);
  const { dirname } = await import('path');
  return dirname(filename);
};
