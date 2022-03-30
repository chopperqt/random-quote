import React from 'react'

import { QuoteSkeleton } from 'components/quote'

import styles from '../QuotesAll.module.scss'

const Skeleton = () => (
  <div className={styles.allQuotesWrap}>
    <QuoteSkeleton />
    <QuoteSkeleton />
    <QuoteSkeleton />
    <QuoteSkeleton />
    <QuoteSkeleton />
    <QuoteSkeleton />
    <QuoteSkeleton />
    <QuoteSkeleton />
  </div>
)
export default Skeleton