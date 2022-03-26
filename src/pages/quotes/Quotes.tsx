import React, { useEffect } from 'react'

import Quote, { QuoteSkeleton } from 'components/quote'
import Button from 'components/button'
import { getLastQuotes } from 'utils/quotes'

import styles from './Quotes.module.scss'

import {
  LAST_UPDATE_QUOTES_TEXT,
  MOCK_DATA,
  SHOW_MORE_TEXT,
  ALL_QUOTES_TEXT
} from './constants'


const Quotes = () => {

  useEffect(() => {
    getLastQuotes()
  }, [])

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className="heading--lx text--bold">
          {LAST_UPDATE_QUOTES_TEXT}
        </div>
        <div className={styles.quotesWrap}>
          <div className={styles.quotes}>
            <QuoteSkeleton />
            <QuoteSkeleton />
            <QuoteSkeleton />
            <QuoteSkeleton />
            <QuoteSkeleton />
            <QuoteSkeleton />
            <QuoteSkeleton />
            <QuoteSkeleton />
            {/* <Quote
              quote={MOCK_DATA}
            />
            <Quote
              quote={MOCK_DATA}
            />
            <Quote
              quote={MOCK_DATA}
            />
            <Quote
              quote={MOCK_DATA}
            />
            <Quote
              quote={MOCK_DATA}
            />
            <Quote
              quote={MOCK_DATA}
            />
            <Quote
              quote={MOCK_DATA}
            />
            <Quote
              quote={MOCK_DATA}
            /> */}
          </div>
          <div className={styles.moreQuotes}>
            <Button>
              {SHOW_MORE_TEXT}
            </Button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="heading--lx text--bold">
          {ALL_QUOTES_TEXT}
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
    </div>
  )
}

export default Quotes