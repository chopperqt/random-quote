export const getControlCount = (count: number) => {
  if (count === 0) {
    return 0
  }

  return count - 1
}