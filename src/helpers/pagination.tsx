export const getRange = (page: number) => {
  if (page === 1) {
    return {
      from: 0,
      to: 10,
    }
  }

  return {
    from: (page - 1) * 10 + 1,
    to: page * 10,
  }
}