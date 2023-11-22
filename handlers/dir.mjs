import { printCurrentDirectory } from '../helpers/utils.mjs';
import { resolve, normalize } from 'path';
import { readdir, lstat, access } from 'fs/promises';

export async function listFiles() {
  try {
    const files = await readdir(process.cwd());

    const fileDetails = await Promise.all(
      files.map(async (file) => {
        const filePath = resolve(process.cwd(), file);
        const stats = await lstat(filePath);
        return { Name: file, Type: stats.isDirectory() ? 'directory' : 'file' };
      })
    );

    console.table(fileDetails);
  } catch (error) {
    console.log('Operation failed:', error.message);
  }
}

export async function changeDirectory(newPath) {
  const targetPath = resolve(process.cwd(), newPath);

  if (targetPath.startsWith(process.cwd())) {
    try {
      await access(targetPath);
      process.chdir(targetPath);
      printCurrentDirectory();
    } catch (error) {
      console.log('Operation failed:', error.message);
    }
  } else {
    console.log('Invalid input. Cannot go upper than root directory.');
  }
}

export async function goUp() {
  const currentPath = process.cwd();
  const parentPath = normalize(resolve(currentPath, '..'));

  if (parentPath !== currentPath) {
    try {
      await access(parentPath);
      process.chdir(parentPath);
      printCurrentDirectory();
    } catch (error) {
      console.log('Operation failed:', error.message);
    }
  } else {
    console.log('Invalid input. Cannot go upper than root directory.');
  }
}

export async function goToDirectory(pathToDirectory) {
  const targetPath = resolve(process.cwd(), pathToDirectory);

  try {
    await access(targetPath);
    process.chdir(targetPath);
    printCurrentDirectory();
  } catch (error) {
    console.log('Operation failed:', error.message);
  }
}
