export const getUserName = () => {
  const arg = process.argv.find((item) => item.includes('--username'));
  const userName = arg ? arg?.split('=')[1] : 'Unknown User';

  return userName;
}
