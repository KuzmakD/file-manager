import { stdout, cwd } from 'node:process';

export const showCurrentDirectory = async () => {
  await stdout.write(`You are currently in ${cwd()}\n`);
}