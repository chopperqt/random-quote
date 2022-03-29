import React from 'react'

import { QuoteSkeleton } from 'components/quote'
import {
  ALL_QUOTES_TEXT,
  QUOTES_ALL_TEXT,
  QUOTES_OF_AUTHORS_TEXT,
} from '../constants'

import styles from './QuotesAll.module.scss'

const QuotesAll = () => (
  <div className="container">
    <div className="heading--lx text--bold">
      {ALL_QUOTES_TEXT}
    </div>
    <div className={styles.description}>
      {QUOTES_ALL_TEXT} 24 цитаты от 3 {QUOTES_OF_AUTHORS_TEXT}
    </div>
    <div className={styles.allQuotes}>
      <div className={styles.filters}>
        <div>Авторы</div>
        <div>Количество лайков</div>
        <div>Количество комментариев</div>
      </div>
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
    </div>
  </div>
)

export default QuotesAll