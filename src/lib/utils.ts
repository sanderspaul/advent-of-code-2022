import * as fs from 'fs';

export function readInputFileToStringArray(
  path: fs.PathOrFileDescriptor,
  callback: (err: NodeJS.ErrnoException | null, data: string[]) => void
): void {
  return fs.readFile(path, (err, data) => {
    let arr: string[] = [];
    if (!err) {
      arr = data.toString().split('\n');
    }
    callback(err, arr);
  });
}

export function readInputFileToString(
  path: fs.PathOrFileDescriptor,
  callback: (err: NodeJS.ErrnoException | null, data: string) => void
) {
  return fs.readFile(path, (err, data) => {
    callback(err, data.toString());
  });
}
