import Store, { filterMethods } from "services"
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
    Store.dispatch(filterMethods.updateFilters({
      p: page
    }))

    onClick(page)
  }

  return {
    numbersOfPages: arrayPages,
    handleClickPage,
  }
}

export default usePagination