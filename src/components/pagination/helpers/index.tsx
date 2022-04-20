const DEFAULT_PAGES_IN_ARRAY = 6

export const fillArray = (from: number, to: number): number[] => {
  let array: number[] = [];

  for (let i = from; i <= to; i++) {
    array.push(i)
  }

  return array
}

export const numbersOfPages = (currentPage: number, pages: number) => {
  let arr: number[] = []
  const checkPage = currentPage - 1 < 1 ? 1 : currentPage - 1

  console.group('Pagination:')
  console.log('CurrentPage: ', currentPage)
  console.log('Pages: ', pages)
  console.groupEnd()

  if (pages < DEFAULT_PAGES_IN_ARRAY) {
    console.log('Условие №1')
    arr = fillArray(1, pages)
  } else if (pages >= DEFAULT_PAGES_IN_ARRAY && currentPage >= pages - 2) {
    console.log('Условие №2')
    arr = fillArray(pages - 3, pages)
  } else if (pages >= DEFAULT_PAGES_IN_ARRAY && currentPage <= pages - 2) {

  } else {
    console.log('Условие №3')
    arr = fillArray(checkPage, pages - 1)
  }

  return arr
}