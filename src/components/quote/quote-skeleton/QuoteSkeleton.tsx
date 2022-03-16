import React from 'react'

import styles from './QuoteSkeleton.module.scss'

export const QuoteSkeletonText = () => (
  <div className={styles.text}>
    <div className={styles.textItem} />
    <div className={styles.textItem} />
    <div className={styles.textItem} />
  </div>
)

export const QuoteSkeletonDate = () => (
  <div className={styles.dateItem} />
)

export const QuoteSkeletonAuthor = () => (
  <div className={styles.author}>
    <div className={styles.dateItem} />
  </div>
)