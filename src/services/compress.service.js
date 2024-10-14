import { createBrotliCompress } from 'node:zlib';
import fs from 'node:fs';
import { resolve, basename } from 'node:path';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';

// Compress file (using Brotli algorithm, should be done using Streams API)
// compress path_to_file path_to_destination
export const compressFile = async (params) => {
  try {
    const filePath = resolve(params[0]);
    const fileName = basename(filePath);
    const newFilePath = resolve(params[1], `${fileName}.br`);
   
    const brotli = createBrotliCompress();
    const inputStream = fs.createReadStream(filePath);
    const outputStream = fs.createWriteStream(newFilePath);

    const pipe = promisify(pipeline);

    await pipe(inputStream, brotli, outputStream);
  } catch (err) {
    console.error('Operation failed');
  }
}
