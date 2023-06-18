import {readFilesInDir} from '$lib/fileSystem';

export async function POST({ request }) {
  const filePath = await request.json();
  const files = await readFilesInDir(filePath.file);
  return new Response(JSON.stringify(files))
}