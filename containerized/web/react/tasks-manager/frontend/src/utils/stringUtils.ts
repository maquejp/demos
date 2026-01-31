/**
 * Capitalizes the first letter of each word in a string
 * @param str - The string to capitalize
 * @returns The string with each word capitalized
 * @example
 * capitalizeEachWord('hello world') // 'Hello World'
 * capitalizeEachWord('in-progress') // 'In-Progress'
 */
export const capitalizeEachWord = (str: string): string => {
  return str
    .split(/[\s-]+/) // Split by whitespace or hyphens
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
