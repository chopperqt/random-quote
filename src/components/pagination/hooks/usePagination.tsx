import { updateUrlParams } from "helpers/urlParams"
import { numbersOfPages } from "../helpers"

interface IUsePagination {
  pages: number
  page: number
  onClick: (page: number) => void
}

const usePagination = ({
  pages,
  page = 1,
  onClick,
}: IUsePagination) => {
  const arrayPages: number[] = numbersOfPages(page, pages)

  const handleClickPage = (page: number) => {
    updateUrlParams({ p: page })
    onClick(page)
  }

  return {
    numbersOfPages: arrayPages,
    handleClickPage,
  }
}

export default usePagination