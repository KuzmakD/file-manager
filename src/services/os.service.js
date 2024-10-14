import os from 'node:os';

// Operating system info (prints following information in console)
export const getOsInfo = async ([params]) => {
  try {
    switch (params) {
      case '--EOL':
        getOsEOL();
        break;
      case '--cpus':
        getOsCpus();
        break;
      case '--homedir':
        getOsHomedir();
        break;
      case '--username':
        getOsUsername();
        break;
      case '--architecture':
        getOsArch(params);
        break;
      default:
        console.log('Invalid command');
    }
    return;
  } catch (err) {
    console.error('Operation failed');
  }
}

// Get EOL (default system End-Of-Line) and print it to console
// os --EOL
const getOsEOL = () => {
  console.log(`${JSON.stringify(os.EOL)}`);
}

// Get host machine CPUs info (overall amount of CPUS plus model 
// and clock rate (in GHz) for each of them) and print it to console
// os --cpus
const getOsCpus = () => {
  console.table(
    os.cpus().map((cpu) => {
        return {
            Model: cpu.model,
            Speed: `${(cpu.speed / 1000).toFixed(2)}GHz`,
        };
    })
  );
}

// Get home directory and print it to console
// os --homedir
const getOsHomedir = () => {
  console.log(os.homedir());
}

// Get current system user name (Do not confuse with the username that is set when the application starts) and print it to console
// os --username
const getOsUsername = () => {
  console.log(os.userInfo().username);
}

// Get CPU architecture for which Node.js binary has compiled and print it to console
// os --architecture
const getOsArch = () => {
  console.log(os.arch());
}
