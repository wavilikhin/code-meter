export const parseFolderPaths = (paths: string[]) => {
  if (!paths.length) {
    return;
  }

  const root = {};

  //   @ts-ignore
  const iterate = (path: string) => {
    const folders = path.split('/');

    if (folders.length === 2) {
      return { [folders[0]]: folders[1] };
    }

    return {
      [folders[0]]: iterate(folders.splice(1, folders.length - 1).join('/')),
    };
  };

  for (const path of paths) {
    if (path.split('/').length === 1) {
      continue;
    }

    Object.assign(root, iterate(path));
  }

  return root;
};
