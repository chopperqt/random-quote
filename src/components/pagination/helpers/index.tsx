export const fillArray = (from: number, to: number): number[] => {
  let array: number[] = [];

  for (let i = from; i <= to; i++) {
    array.push(i)
  }

  return array
}