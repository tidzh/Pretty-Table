export const substringText = (text: string) => {
  if (text.length > 42) {
    return `${text.substring(0, 42)}...`;
  }
};
