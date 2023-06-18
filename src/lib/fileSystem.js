import path from 'path';
import fs from 'fs';
import * as url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export async function getFilesInDir(providedPath = '/') {
  // console.log(providedPath);
  const selectedPath = providedPath.directory;
  const stuff = await fs.readdirSync(selectedPath, (err, files) => {
    return files;
  })
  return stuff;
}
export const readFilesInDir = async (providedPath = '/') => {
  const fileContents = await fs.readFileSync(providedPath, "utf8", function(err, content) {
    if (err) {
      return console.error(err);
    }
    console.log(content);
  })
  return fileContents;
}