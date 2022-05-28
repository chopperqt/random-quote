import Pagination from "./Pagination";

export interface PaginationProps {
  page: number,
  pages: number,
  onClick: (page: number) => void
}

export default Pagination