import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { copyFile as copyFileAsync, rename, writeFile, lstat, unlink} from 'fs/promises';


export async function copyFile(source, destination) {
  const sourcePath = resolve(process.cwd(), source);
  let destinationPath = resolve(process.cwd(), destination);

  try {
    const destinationIsDirectory = (await lstat(destinationPath)).isDirectory();

    if (destinationIsDirectory) {
      const fileName = source.split('/').pop(); 
      destinationPath = resolve(destinationPath, fileName);
    }

    await copyFileAsync(sourcePath, destinationPath);
  } catch (error) {
    console.log('Operation failed:', error.message);
  }
}
export async function addFile(newFileName) {
  const filePath = resolve(process.cwd(), newFileName);

  try {
    await writeFile(filePath, '');
  } catch (error) {
    console.log('Operation failed:', error.message);
  }
}

export function readFileContent(filePath) {
  const fileStream = createReadStream(resolve(process.cwd(), filePath), 'utf-8');

  fileStream.on('data', (chunk) => {
    process.stdout.write(chunk);
  });

  fileStream.on('error', (error) => {
    console.log('Operation failed:', error.message);
  });
}

export async function moveFile(source, destination) {
  const sourcePath = resolve(process.cwd(), source);
  const destinationPath = resolve(process.cwd(), destination);

  try {
    await copyFile(sourcePath, destinationPath);
    await unlink(sourcePath);
  } catch (error) {
    console.log('Operation failed:', error.message);
  }
}

export async function deleteFile(file) {
  const filePath = resolve(process.cwd(), file);

  try {
    await unlink(filePath);
  } catch (error) {
    console.log('Operation failed:', error.message);
  }
}

export async function renameFile(oldName, newName) {
  const oldPath = resolve(process.cwd(), oldName);
  const newPath = resolve(process.cwd(), newName);

  try {
    await rename(oldPath, newPath);
  } catch (error) {
    console.log('Operation failed:', error.message);
  }
}
