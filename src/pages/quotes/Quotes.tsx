import React, { useEffect } from 'react'

import Quote, { QuoteSkeleton } from 'components/quote'
import Button from 'components/button'
import SkeletonLastQuotes from './skeleton-last-quotes/SkeletonLastQuotes'
import Empty from './empty/Empty'
import useQuotes from './hooks/useQuotes'

import styles from './Quotes.module.scss'

import {
  LAST_UPDATE_QUOTES_TEXT,
  MOCK_DATA,
  SHOW_MORE_TEXT,
  ALL_QUOTES_TEXT,
  LAST_UPDATE_QUOTES_DESCRIPTION_TEXT,
} from './constants'
import { useSelector } from 'react-redux'
import { IStore } from 'services'


const MAX_LAST_QUOTES_PER_PAGE = 8;

const Quotes = () => {
  const lastQuotes = useSelector((store: IStore) => store.quotesStore.lastQuotes)
  const lastQuotesCount = useSelector((store: IStore) => store.quotesStore.lastQuotesCount)
  const loadingLastQuotes = useSelector((store: IStore) => store.notificationsStore.loading.getLastQuotes)

  const {
    quotesFirstColumn,
    quotesSecondColumn,
  } = useQuotes({
    quotes: lastQuotes,
  })

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className="heading--lx text--bold">
          {LAST_UPDATE_QUOTES_TEXT}
        </div>
        {(!loadingLastQuotes || loadingLastQuotes === 'PENDING') && (
          <div className={styles.descriptionSkeleton} />
        )}
        {loadingLastQuotes === 'SUCCESS' && (
          <div className={styles.description}>
            12 {LAST_UPDATE_QUOTES_DESCRIPTION_TEXT}
          </div>
        )}
        <div className={styles.quotesWrap}>
          <div className={styles.quotes}>
            {(!loadingLastQuotes || loadingLastQuotes === 'PENDING') && (
              <SkeletonLastQuotes />
            )}
            {(loadingLastQuotes === 'FAILURE' || loadingLastQuotes === 'SUCCESS') && lastQuotes.length === 0 && (
              <Empty />
            )}
            {loadingLastQuotes === 'SUCCESS' && loadingLastQuotes.length !== 0 && (
              <div className={styles.grid}>
                <div className={styles.gridColumn}>
                  {quotesFirstColumn.map((quote) => (
                    <Quote
                      quote={quote}
                    />
                  ))}
                </div>
                <div className={styles.gridColumn}>
                  {quotesSecondColumn.map((quote) => (
                    <Quote
                      quote={quote}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className={styles.moreQuotes}>
            {lastQuotesCount > MAX_LAST_QUOTES_PER_PAGE && (
              <Button>
                {SHOW_MORE_TEXT}
              </Button>
            )}
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