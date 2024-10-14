import { homedir } from 'node:os';
import {
  chdir,
  stdin as input, 
  stdout as output
} from 'node:process';
import readline from 'node:readline/promises';
import { getUserName } from './utils/getUserName.js';
import fsService from './services/file.service.js';
import { showCurrentDirectory } from './utils/showCurrentDirectory.js';
import { hashFile } from './services/hash.service.js';
import { compressFile } from './services/compress.service.js';
import { decompressFile } from './services/decompress.service.js';
import { getOsInfo } from './services/os.service.js';

const init = async () => {
  const rl = readline.createInterface({ input, output, prompt: '> ' });
  chdir(homedir());
  
  const userName = getUserName();
  output.write(`Welcome to the File Manager, ${userName}!\n`);
  output.write(`You are currently in ${process.cwd()}\n`);

  rl.on('line', async (input) => {
    let [commandName, ...params] = input
      .trim()
      .split(' ')
      .filter((item) => item);

    try {
      switch(commandName) {
        case 'up':
          if (!params.length) {
            await fsService.dirUp();
            break;
          } 
          throw new Error();
        case 'cd':
          if (params.length === 1) {
            await fsService.changeDir(params);
            break;
          }
          throw new Error();
        case 'ls':
          if (!params.length) {
            await fsService.listFiles();
            break;
          }
          throw new Error();
        case 'cat':
          if (params.length === 1) {
            await fsService.readFile(params);
            break;
          }
          throw new Error();
        case 'add':
          if (params.length === 1) {
            await fsService.addFile(params);
            break;
          }
          throw new Error();
        case 'rn':
          if (params.length === 2) {
            await fsService.renameFile(params);
            break;
          }
          throw new Error();
        case 'cp':
          if (params.length === 2) {
            await fsService.copyFile(params);
            break;
          }
          throw new Error();
        case 'mv':
          if (params.length === 2) {
            await fsService.moveFile(params);
            break;
          }
          throw new Error();
        case 'rm':
          if (params.length === 1) {
            await fsService.deleteFile(params);
            break;
          }
          throw new Error();
        case 'hash':
          if (params.length === 1) {
            await hashFile(params);
            break;
          }
          throw new Error();
        case 'os':
          if (params.length === 1) {
            await getOsInfo(params);
            break;
          }
          throw new Error();
        case 'compress':
          if (params.length === 2) {
            await compressFile(params);
            break;
          }
          throw new Error();
        case 'decompress':
          if (params.length === 2) {
            await decompressFile(params);
            break;
          }
          throw new Error();
        case '.exit':
          rl.close();
          break;
        default:
          output.write('Invalid input\n');
          break;
      }
    } catch (err) {
      output.write('Invalid input\n');
    } finally {
      await showCurrentDirectory();
    }
  });

  rl.on('close', () => {
    output.write(`Thank you for using File Manager, ${userName}, goodbye!\n`)
  });

  rl.on('error', () => output.write('An unknown error has occurred!\n'));
}

await init();
