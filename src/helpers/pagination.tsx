export const getRange = (from: number) => {
  if (from === 1) {
    return {
      from: 0,
      to: 10,
    }
  }

  return {
    from: (from - 1) * 10,
    to: from * 10,
  }
}