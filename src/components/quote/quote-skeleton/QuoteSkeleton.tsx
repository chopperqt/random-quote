import cx from 'classnames'

import Skeleton from 'components/skeleton'

import styles from './QuoteSkeleton.module.scss'

export const QuoteSkeletonText = () => (
  <div className={styles.text}>
    <Skeleton className={cx(styles.textItem, 'custom')} />
    <Skeleton className={cx(styles.textItem, 'custom')} />
    <Skeleton className={cx(styles.textItem, 'custom')} />
  </div>
)

export const QuoteSkeletonDate = () => (
  <Skeleton className={styles.dateItem} />
)

export const QuoteSkeletonAuthor = () => (
  <div className={styles.author}>
    <Skeleton className={styles.dateItem} />
  </div>
)

export const QuoteSkeletonLikes = () => (
  <div className={styles.likesWrap}>
    <Skeleton className={styles.likesItem}></Skeleton>
    <Skeleton className={styles.likesItem}></Skeleton>
    <Skeleton className={styles.likesItem}></Skeleton>
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
