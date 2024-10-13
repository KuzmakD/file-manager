import { homedir } from 'node:os';
import {
  chdir,
  cwd,
  argv, 
  stdin as input, 
  stdout as output
} from 'node:process';
import readline from 'node:readline/promises';

const init = async () => {
  const rl = readline.createInterface({ input, output, prompt: '> ' });
  chdir(homedir());
  
  const arg = argv.find((item) => item.includes('--username'));
  const userName = arg ? arg?.split('=')[1] : 'Unknown User';
  console.log(`Welcome to the File Manager, ${userName}!`);

  output.write(`You are currently in ${cwd()}\n`);

  rl.on('line', async (input) => {
    let [commandName, ...params] = input
      .trim()
      .toLowerCase()
      .split(' ')
      .filter((item) => item);

    switch(commandName) {
      case 'up':
        console.log('Go up');
        break;
      case 'ls':
        console.log('List Files');
        break;
      case 'os':
        console.log('OS');
        break;
      case 'cd':
        console.log('changeDirectory');
        break;
      case 'pwd':
        console.log('printWorkingDirectory');
        break;
      case 'cat':
        console.log('cat');
        break;
      case 'add':
        console.log('add file');
        break;
      case '.exit':
        rl.close();
        break;
      default:
        output.write('Invalid input\n');
        output.write(`You are currently in ${cwd()}\n`);
    }
  });

  rl.on('close', () => {
    output.write(`Thank you for using File Manager, ${userName}, goodbye!\n`)
  });

  rl.on('error', () => output.write('An unknown error has occurred!\n'));
}

await init();
