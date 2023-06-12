import path from 'path';
import fs from 'fs';
import * as url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

async function getFilesInDir(providedPath = '/') {
  const selectedPath = providedPath;
  const stuff = await fs.readdirSync(selectedPath, (err, files) => {
    // console.log(files);
    return files;
  })
  return stuff;
}
function readFilesInDir(providedPath = '/', file) {
  const selectedPath = path.join(__dirname, providedPath);
  fs.readFile(`${selectedPath}/${file}`, "utf8", function(err, content) {
    if (err) {
      return console.error(err);
    }
    console.log(content);
  })
}

export const load = async () => {
  const homePath = path.join(__dirname, '..', '..', 'home');
  const filesInPath = await getFilesInDir(`${homePath}/`);

  return {
    homePath: homePath,
    files: filesInPath
  }
}