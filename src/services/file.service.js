import fs from 'node:fs';
import { unlink } from 'node:fs/promises';
import {resolve, dirname, basename } from 'node:path';
import { chdir, cwd, stdout, stderr } from 'node:process';

// Go upper from current directory (when you are in the root folder this operation shouldn't change working directory)
// up
const dirUp = async () => {
  try {
    await chdir('..');
  } catch (err) {
    console.error('Operation failed');
  }
}

// Go to dedicated folder from current directory (path_to_directory can be relative or absolute)
// cd path_to_directory
const changeDir = async (dirPath) => {
  try {
    await chdir(resolve(cwd(), dirPath[0]));
  } catch (err) {
    console.error('Operation failed');
  }
}

// Print in console list of all files and folders in current directory. 
// ls
const listFiles = async () => {
  await fs.readdir(cwd(), { withFileTypes: true }, (err, files) => {
    if (err) console.error('Operation failed');
    const result = files
      .map((file) => ({
        Name: file.name,
        Type: file.isDirectory()? 'directory' : 'file',    
      }))
      .sort((a, b) => {
        return (a.Type !== b.Type) 
        ? a.Type.localeCompare(b.Type)
        : a.Name.localeCompare(b.Name);
      });

    console.table(result);
  })
}

// Read file and print it's content in console (should be done using Readable stream)
// cat path_to_file
const readFile = async ([filePath]) => {
  try {
    const fileReadStream = await fs.createReadStream(filePath, 'utf8');
    let chunk = '';
  
    fileReadStream.on('data', (data) => {
      chunk = chunk + data;
    });

    fileReadStream.on('close', () => stdout.write(chunk));

    fileReadStream.on('error', (err) => stderr.write('Operation failed\n'));
  } catch (err) {
    stderr.write('Operation failed\n');
  }
}

// Create empty file in current working directory
// add new_file_name
const addFile = async([fileName]) => {
  const filePath = resolve(cwd(), fileName);

  await fs.writeFile(filePath, '', { flag: 'ax'}, (err) => {
    if (err) console.error('Operation failed');
  });
}

// Rename file (content should remain unchanged)
// rn path_to_file new_filename
const renameFile = async (params) => {
  try {
    const oldFilePath = resolve(params[0]);
    const newFilePath = resolve(dirname(oldFilePath), params[1]);

    await fs.rename(oldFilePath, newFilePath, (err) => {
      if (err) {
        console.error('Operation failed')
      }
    });
  } catch (error) {
    console.error('Operation failed');
  }
}

// Copy file (should be done using Readable and Writable streams)
// cp path_to_file path_to_new_directory
const copyFile = async (params) => {
  try {
    const oldFilePath = resolve(params[0]);
    const newFilePath = resolve(params[1], basename(oldFilePath));;

    const inputStream = fs.createReadStream(oldFilePath);
    const outputStream = fs.createWriteStream(newFilePath);

    await inputStream.pipe(outputStream);
  } catch (error) {
    console.error('Operation failed');
  }
}

// Move file (same as copy but initial file is deleted,
// copying part should be done using Readable and Writable streams)
// mv path_to_file path_to_new_directory
const moveFile = async (params) => {
  try {
    const oldFilePath = resolve(params[0]);
    const newFilePath = resolve(params[1], basename(oldFilePath));;

    const inputStream = fs.createReadStream(oldFilePath);
    const outputStream = fs.createWriteStream(newFilePath);

    await inputStream.pipe(outputStream);
    await unlink(oldFilePath);
  } catch (error) {
    console.error('Operation failed');
  }
}

// Delete file
// rm path_to_file
const deleteFile = async (params) => {
  try {
    const filePath = resolve(params[0]);
    await unlink(filePath);
  } catch (error) {
    console.error('Operation failed');
  }
}

export default {
  dirUp,
  changeDir,
  listFiles,
  readFile,
  addFile,
  renameFile,
  copyFile,
  moveFile,
  deleteFile,
}
