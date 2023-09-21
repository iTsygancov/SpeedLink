export const getKeyName = (key: string): string => {
  if (key.startsWith("Digit")) {
    return key.substring(5);
  } else {
    return key.substring(3).toUpperCase();
  }
};
