import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import {resolve} from 'path';

export function calculateHash(file) {
  const filePath = resolve(process.cwd(), file);
  const hash = createHash('md5');

  try {
    const stream = createReadStream(filePath);
    stream.on('data', (data) => hash.update(data));
    stream.on('end', () => console.log(`Hash: ${hash.digest('hex')}`));
  } catch (error) {
    console.log('Operation failed:', error.message);
  }
}
