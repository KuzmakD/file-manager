import path from 'node:path';
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';


// Calculate hash for file and print it into console
// hash path_to_file
export const hashFile = async (params) => {
  try {
    const filePath = path.resolve(process.cwd(), params[0]);
    const hashFunc = createHash('sha256');
    const fileStream = createReadStream(filePath);
    let result = '';

    fileStream
      .on('data', (chunk) => {
        result += chunk;
      })
      .on('end', () => {
        const fileHash = hashFunc.update(result).digest('hex');
        console.log(fileHash);
      })
      .on('error', (__) => {
        process.stdout.write('Operation failed\n');
    });

  } catch (err) {
    console.error('Operation failed');
  }
}
