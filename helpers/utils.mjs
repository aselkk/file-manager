import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function printCurrentDirectory() {
  console.log(`You are currently in ${process.cwd()}`);
}

export function exitFileManager() {
  const args = process.argv.slice(2);
  const usernameIndex = args.findIndex((arg) => arg.startsWith('--username='));
  const username = usernameIndex !== -1 ? args[usernameIndex].split('=')[1] : 'Guest';

  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  rl.close();
}
