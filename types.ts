export interface SearchCriteria {
  ext?: string[];
  fileNames?: string[];
  ignorePaths?: string[];
}

export type OptionalKeys<T extends object> = {
  [P in keyof T]: {} extends Pick<T, P> ? P : never;
}[keyof T];

export type RequiredKeys<T extends object> = {
  [P in keyof T]: {} extends Pick<T, P> ? never : P;
}[keyof T];
