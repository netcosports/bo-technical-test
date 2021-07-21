export const generateRandomString = (nb) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/?.&@!§';
  const charactersLength = characters.length;
  for (let index = 0; index < nb; index++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
