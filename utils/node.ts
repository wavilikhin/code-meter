import { writeFile as wf, readFile as rf, readdir as rd, stat as st } from 'fs';
import { promisify } from 'util';

export const writeFile = promisify(wf);
export const readFile = promisify(rf);
export const readdir = promisify(rd);
export const stat = promisify(st);
