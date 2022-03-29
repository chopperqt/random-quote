import React from 'react'
import { useSelector } from 'react-redux'

import { IStore } from 'services'
import Skeleton from './skeleton/Skeleton'
import useQuotes from '../hooks/useQuotes'
import Quote from 'components/quote'
import Button from 'components/button'
import {
  LAST_QUOTES_PER_PAGE,
  SHOW_MORE_TEXT,
  LAST_UPDATE_QUOTES_TEXT
} from '../constants'
import Empty from './empty/Empty'

import styles from './QuotesLastUpdate.module.scss'

const QuotesLastUpdate = () => {
  const loadingLastQuotes = useSelector((store: IStore) => store.notificationsStore.loading.getLastQuotes)
  const lastQuotes = useSelector((store: IStore) => store.quotesStore.lastQuotes)
  const lastQuotesCount = useSelector((store: IStore) => store.quotesStore.lastQuotesCount)

  const {
    quotesFirstColumn,
    quotesSecondColumn,
    lastQuotesDescription,
  } = useQuotes({
    lastQuotesCount,
    quotes: lastQuotes,
  })

  return (
    <div className={styles.container}>
      <div className="heading--lx text--bold">
        {LAST_UPDATE_QUOTES_TEXT}
      </div>
      <div className={styles.description}>
        {lastQuotesDescription}
      </div>
      <div className={styles.quotesWrap}>
        <div className={styles.quotes}>
          {(!loadingLastQuotes || loadingLastQuotes === 'PENDING') && (
            <Skeleton />
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
          {lastQuotesCount > LAST_QUOTES_PER_PAGE && (
            <Button>
              {SHOW_MORE_TEXT}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuotesLastUpdate