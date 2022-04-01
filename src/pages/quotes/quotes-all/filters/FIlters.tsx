import React from 'react'

import Collapse from 'components/collapse'
import { useFilters } from '../../hooks'


import styles from './Filters.module.scss'
import Skeleton from './partials/Skeleton'

const Filters = () => {
  const {
    handleCloseAuthors,
    handleOpenAuthors,
    openedAuthors,
  } = useFilters({})

  return (
    <div className={styles.filters}>
      <Skeleton />
      <Collapse
        open={openedAuthors}
        onClose={handleCloseAuthors}
        onOpen={handleOpenAuthors}
        text="Авторы (1)"
      >
        <div>dawdawd</div>
      </Collapse>
      <div>Количество лайков</div>
      <div>Количество комментариев</div>
    </div>
  )
}

export default Filters