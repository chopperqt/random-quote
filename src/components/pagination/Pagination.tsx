import Icon, { IconList } from 'components/icon'
import usePagination from './hooks/usePagination'
import Item from './item/Item'

import styles from './Pagination.module.scss'

interface IPaginationProps {
  page: number,
  pages: number,
}

const Pagination = ({
  page,
  pages,
}: IPaginationProps) => {
  const {
    currentPage,
    numbersOfPages,
    handleClickPage,
  } = usePagination({
    pages,
    page,
  })

  return (
    <div className={styles.layout}>
      <button
        disabled={1 === currentPage}
        onClick={() => handleClickPage(currentPage - 1)}
        className={styles.button}
      >
        <Icon icon={IconList.chevronLeft} />
      </button>
      {/* {currentPage > 4 && pages > 6 && (
        <Item
          onClick={() => handleClickPage(1)}
          page="1"
          active={1 === currentPage}
        />
      )}
      {currentPage > 4 && pages > 6 && (
        <div className={styles.empty}>...</div>
      )} */}
      {numbersOfPages.map((p: number) => {
        const isActive = p === currentPage

        return (
          <Item
            onClick={() => handleClickPage(p)}
            page={p}
            active={isActive}
          />
        )
      })}
      {/* {pages < currentPage - 2 && (
        <div className={styles.empty}>...</div>
      )}
      {pages < currentPage - 2 && (
        <Item
          onClick={() => handleClickPage(pages)}
          page={pages}
          active={currentPage === pages}
        />
      )} */}
      <button
        disabled={currentPage === pages}
        onClick={() => handleClickPage(currentPage + 1)}
        className={styles.button}
      >
        <Icon icon={IconList.chevronRight} />
      </button>
    </div>
  )
}

export default Pagination