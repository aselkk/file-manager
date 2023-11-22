import readline from 'readline';
import { printCurrentDirectory, exitFileManager } from './helpers/utils.mjs';
import { listFiles, goUp, goToDirectory } from './handlers/dir.mjs';
import { copyFile, moveFile, deleteFile, renameFile, readFileContent, addFile } from './handlers/file.mjs';
import * as getOsInfo from './handlers/system.mjs';
import { calculateHash } from './handlers/hash.mjs';
import { compressFile, decompressFile } from './handlers/compression.mjs';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
  prompt: '> '
});

const args = process.argv.slice(2);
const usernameIndex = args.findIndex((arg) => arg.startsWith('--username='));
const username = usernameIndex !== -1 ? args[usernameIndex].split('=')[1] : 'guest';

console.log(`Welcome to the File Manager, ${username}!`);
printCurrentDirectory();

rl.prompt();

rl.on('line', (input) => {
  const [command, ...args] = input.split(' ');

  switch (command) {
    case 'up':
      goUp();
      break;
    case 'cd':
      goToDirectory(args[0]);
      break;
    case 'ls':
      listFiles();
      break;
    case 'cp':
      copyFile(args[0], args[1]);
      break;
    case 'mv':
      moveFile(args[0], args[1]);
      break;
    case 'rm':
      deleteFile(args[0]);
      break;
    case 'rn':
      renameFile(args[0], args[1]);
      break;
    case 'cat':
      readFileContent(args[0]);
      break;
    case 'add':
      addFile(args[0]);
      break;
    case 'os':
      handleOsCommand(args);
      break;
    case 'hash':
      calculateHash(args[0]);
      break;
    case 'compress':
      compressFile(args[0]);
      break;
    case 'decompress':
      decompressFile(args[0], args[1]);
      break;
    case '.exit':
      exitFileManager();
      break;
    default:
      console.log('Invalid input. Please enter a valid command.');
  }

});

function handleOsCommand(args) {
  const osCommand = args[0];

  switch (osCommand) {
    case '--EOL':
      getOsInfo.getEOL();
      break;
    case '--cpus':
      getOsInfo.getCpusInfo();
      break;
    case '--homedir':
      getOsInfo.getHomeDirectory();
      break;
    case '--username':
      getOsInfo.getCurrentUsername();
      break;
    case '--architecture':
      getOsInfo.getCpuArchitecture();
      break;
    default:
      console.log('Invalid OS command. Please enter a valid OS command.');
  }
}

process.on('SIGINT', exitFileManager);