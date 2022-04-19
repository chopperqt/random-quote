import { useState } from "react"

import { updateUrlParams } from "helpers/urlParams"
import { fillArray } from "../helpers"

interface IUsePagination {
  pages: number
  page: number
}

const usePagination = ({
  pages,
  page = 1,
}: IUsePagination) => {
  const [currentPage, setCurrentPage] = useState(page)
  let numberOfPages = fillArray(1, 5)


  if (currentPage >= 4) {
    numberOfPages = fillArray(currentPage - 2, currentPage + 2)
  }

  if (currentPage >= pages - 2) {
    numberOfPages = fillArray(pages - 4, pages)
  }

  const handleClickPage = (page: number) => {
    updateUrlParams({ p: page })
    setCurrentPage(page)
  }

  const handleClickBack = () => {
    updateUrlParams({ p: page - 1 })
    setCurrentPage(page - 1)
  }

  const handleClickNext = () => {
    updateUrlParams({ p: page + 1 })
    setCurrentPage(page + 1)

  }

  return {
    currentPage,
    numberOfPages,
    handleClickPage,
  }
}

export default usePagination