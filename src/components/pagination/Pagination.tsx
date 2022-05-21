import Icon, { IconList } from 'components/icon'
import usePagination from './hooks/usePagination'
import Item from './item/Item'

import styles from './Pagination.module.scss'

interface IPaginationProps {
  page: number,
  pages: number,
  onClick: (page: number) => void
}

const Pagination = ({
  page,
  pages,
  onClick,
}: IPaginationProps) => {
  const {
    numbersOfPages,
    handleClickPage,
  } = usePagination({
    pages,
    page,
    onClick,
  })

  return (
    <div className={styles.layout}>
      <button
        disabled={1 === page}
        onClick={() => handleClickPage(page - 1)}
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
        const isActive = p === page

        return (
          <Item
            key={p}
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
        disabled={page === pages}
        onClick={() => handleClickPage(page + 1)}
        className={styles.button}
      >
        <Icon icon={IconList.chevronRight} />
      </button>
    </div>
  )
}

export default Pagination