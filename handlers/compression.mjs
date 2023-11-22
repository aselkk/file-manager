import { createReadStream, createWriteStream, promises as fsPromises } from 'fs';
import { createGzip, createGunzip, brotliDecompress } from 'zlib';
import { resolve } from 'path';
import { pipeline } from 'stream/promises'; 

export function compressFile(file) {
  const inputFilePath = resolve(process.cwd(), file);
  const outputFilePath = `${inputFilePath}.gz`;

  const inputStream = createReadStream(inputFilePath);
  const gzipStream = createGzip();
  const outputStream = createWriteStream(outputFilePath);

  inputStream.pipe(gzipStream).pipe(outputStream);

  outputStream.on('finish', () => {
    console.log('File compressed successfully.');
  });

  outputStream.on('error', (error) => {
    console.log('Operation failed:', error.message);
  });
}

export async function decompressFile(file, destination) {
  const inputFilePath = resolve(process.cwd(), file);
  const outputFilePath = resolve(process.cwd(), destination);

  const destinationStats = await fsPromises.stat(outputFilePath);
  const isDirectory = destinationStats.isDirectory();

  const finalOutputPath = isDirectory
    ? resolve(outputFilePath, file.replace(/\.gz$/, ''))
    : outputFilePath;

  const inputStream = createReadStream(inputFilePath);
  const gunzipStream = createGunzip();
  const outputStream = createWriteStream(finalOutputPath);

  inputStream.pipe(gunzipStream).pipe(outputStream);

  return new Promise((resolve, reject) => {
    outputStream.on('finish', () => {
      console.log('File decompressed successfully.');
      resolve();
    });

    outputStream.on('error', (error) => {
      console.log('Operation failed:', error.message);
      reject(error);
    });
  });
}
