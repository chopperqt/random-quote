import React from 'react'

import Collapse from 'components/collapse'

import styles from './Filters.module.scss'

const Filters = () => {
  return (
    <div className={styles.filters}>
      <Collapse text="Авторы (1)" />
      <div>Количество лайков</div>
      <div>Количество комментариев</div>
    </div>
  )
}

export default Filters