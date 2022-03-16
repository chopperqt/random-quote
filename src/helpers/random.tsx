export function generateRandomNumber(from: number, to: number) {
  let rand = from + Math.random() * (to + 1 - from)

  return Math.floor(rand)
}