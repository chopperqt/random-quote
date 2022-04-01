import React from 'react'

import Collapse from 'components/collapse'
import { useFilters } from '../../hooks'
import Skeleton from './partials/Skeleton'
import Checkbox from 'components/checkbox'

import styles from './Filters.module.scss'

const Filters = () => {
  const {
    handleCloseAuthors,
    handleOpenAuthors,
    openedAuthors,
    authorsTitle,
    isLoading,
    isSuccess,
    authors,
  } = useFilters({})

  return (
    <div className={styles.filters}>
      {isSuccess && (
        <Collapse
          open={openedAuthors}
          onClose={handleCloseAuthors}
          onOpen={handleOpenAuthors}
          text={authorsTitle}
        >
          <>
            {authors.map(({ name }) => (
              <Checkbox
                label={name}
              />
            ))}
          </>
        </Collapse>
      )}
      {isLoading && (
        <Skeleton />
      )}
    </div>
  )
}

export default Filters