import cx from 'classnames'

import Skeleton from 'components/skeleton'

import styles from './QuoteSkeleton.module.scss'

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

export const QuoteSkeletonLikes = () => (
  <div className={styles.likesWrap}>
    <div className={styles.likesItem}></div>
    <div className={styles.likesItem}></div>
    <div className={styles.likesItem}></div>
  </div >
)

const QuoteSkeleton = () => (
  <div className={styles.layout}>
    <QuoteSkeletonLikes />
    <div>
      <QuoteSkeletonText />
      <div className={styles.extraText}>
        <QuoteSkeletonDate />
        <QuoteSkeletonAuthor />
      </div>

    </div>
  </div >
)

export default QuoteSkeleton
