import { useState } from "react"

import { updateUrlParams } from "helpers/urlParams"
import { numbersOfPages } from "../helpers"

interface IUsePagination {
  pages: number
  page: number
}

const usePagination = ({
  pages,
  page = 1,
}: IUsePagination) => {
  const [currentPage, setCurrentPage] = useState(page)
  const arrayPages: number[] = numbersOfPages(currentPage, pages)

  const handleClickPage = (page: number) => {
    updateUrlParams({ p: page })
    setCurrentPage(page)
  }

  return {
    currentPage,
    numbersOfPages: arrayPages,
    handleClickPage,
  }
}

export default usePagination