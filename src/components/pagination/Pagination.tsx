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
    numberOfPages,
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
      {numberOfPages.map((p) => {
        const isActive = p === currentPage

        return (
          <Item
            onClick={() => handleClickPage(p)}
            page={p}
            active={isActive}
          />
        )
      })}
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