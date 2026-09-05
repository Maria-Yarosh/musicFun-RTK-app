export function trimToMaxLenght(str: string, maxLenght = 100): string {
  return str.length > maxLenght ? str.slice(0, maxLenght - 3) + '...' : str
}
