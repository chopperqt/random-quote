import React from 'react'

import { QuoteSkeleton } from 'components/quote'

import styles from '../QuotesLastUpdate.module.scss'

const Skeleton = () => (
  <div className={styles.skeleton}>
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