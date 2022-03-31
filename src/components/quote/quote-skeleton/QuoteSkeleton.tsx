import React, { Fragment } from 'react'
import cx from 'classnames'

import styles from './QuoteSkeleton.module.scss'
import rootStyles from '../Quote.module.scss'

export const QuoteSkeletonText = () => (
  <div className={styles.text}>
    <div className={cx(styles.textItem, 'custom')} />
    <div className={cx(styles.textItem, 'custom')} />
    <div className={cx(styles.textItem, 'custom')} />
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

const QuoteSkeleton = () => (
  <div className={rootStyles.layout}>
    <QuoteSkeletonText />
    <div className={rootStyles.info}>
      <Fragment>
        <QuoteSkeletonDate />
        <QuoteSkeletonAuthor />
      </Fragment>
    </div>
  </div>
)

export default QuoteSkeleton
