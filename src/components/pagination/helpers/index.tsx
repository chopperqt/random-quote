const DEFAULT_PAGES_IN_ARRAY = 5

export const fillArray = (from: number, to: number): number[] => {
  let array: number[] = [];

  for (let i = from; i <= to; i++) {
    array.push(i)
  }

  return array
}

export const numbersOfPages = (currentPage: number, pages: number) => {
  let arr: number[] = []

  if (pages <= DEFAULT_PAGES_IN_ARRAY) {
    arr = fillArray(1, pages)
  } else if (pages > DEFAULT_PAGES_IN_ARRAY && currentPage <= pages - 4 && currentPage < DEFAULT_PAGES_IN_ARRAY - 1) {
    arr = fillArray(1, 4)
  } else if (pages > DEFAULT_PAGES_IN_ARRAY && currentPage >= pages - 3) {
    arr = fillArray(pages - 4, pages)
  } else {
    arr = fillArray(currentPage - 1, currentPage + 2)
  }

  return arr
}