import { EOL, cpus, homedir, userInfo, arch } from 'os';

export function getEOL() {
  console.log(`System End-Of-Line (EOL): ${EOL}`);
}

export function getCpusInfo() {
  const cpusInfo = cpus();

  console.log(`Number of CPUs: ${cpusInfo.length}`);

  const formattedCpusInfo = cpusInfo.map((cpu, index) => ({
    CPU: index + 1,
    Model: cpu.model,
    Speed: `${(cpu.speed / 1000).toFixed(2)} GHz`,
  }));

  console.table(formattedCpusInfo);
}

export function getHomeDirectory() {
  console.log(`Home Directory: ${homedir()}`);
}

export function getCurrentUsername() {
  console.log(`Current System User Name: ${userInfo().username}`);
}

export function getCpuArchitecture() {
  console.log(`Node.js Binary CPU Architecture: ${arch()}`);
}
