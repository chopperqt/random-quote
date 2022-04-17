import React from 'react'

import styles from '../Filters.module.scss'

const Skeleton = () => (
  <div className={styles.skeleton}>
    <div className={styles.item} />
    <div className={styles.item} />
    <div className={styles.item} />
  </div>
)

export default Skeleton