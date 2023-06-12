import {getFilesInDir} from '$lib/fileSystem';

export async function POST({ request }) {
  const directory = await request.json();
  // console.log(directory);
  const files = await getFilesInDir(directory);
  return new Response(JSON.stringify(files))
}