import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import Skeleton from './partials/Skeleton'
import decOfNum, { quoteWords } from 'helpers/decOfNum'
import {
  ALL_QUOTES_TEXT,
  QUOTES_ALL_TEXT,
  QUOTES_OF_AUTHORS_TEXT,
} from '../constants'
import { getQuotes } from 'utils/quotes'
import Quote from 'components/quote'
import useQuotes from '../hooks/useQuotes'

import styles from './QuotesAll.module.scss'

import { IStore } from 'services'

const QuotesAll = () => {
  const quotes = useSelector((store: IStore) => store.quotesStore.quotes)
  const quotesCount = useSelector((store: IStore) => store.quotesStore.quotesCount)
  const hasLoadingQuotes = useSelector((store: IStore) => store.notificationsStore.loading.getQuotes)
  const formattedDescription = `${QUOTES_ALL_TEXT} ${quotesCount} ${decOfNum(quotesCount, quoteWords)} от 4 авторов`

  const {
    quotesFirstColumn,
    quotesSecondColumn,
  } = useQuotes({
    quotes
  })

  useEffect(() => {
    getQuotes()
  }, [])

  return (
    <div className="container">
      <div className="heading--lx text--bold">
        {ALL_QUOTES_TEXT}
      </div>
      <div className={styles.description}>
        {formattedDescription}
      </div>
      <div className={styles.allQuotes}>
        <div className={styles.filters}>
          <div>Авторы</div>
          <div>Количество лайков</div>
          <div>Количество комментариев</div>
        </div>
        <div className={styles.allQuotesWrap}>
          {hasLoadingQuotes === 'SUCCESS' && quotes.length > 0 && (
            <>
              <div className={styles.gridColumn}>
                {quotesFirstColumn.map((quote) => (
                  <Quote quote={quote} />
                ))}
              </div>
              <div className={styles.gridColumn}>
                {quotesSecondColumn.map((quote) => (
                  <Quote quote={quote} />
                ))}
              </div>
            </>
          )}
          {hasLoadingQuotes === 'PENDING' && (
            <Skeleton />
          )}
        </div>
        {/* <Skeleton /> */}
      </div>
    </div>
  )
}

export default QuotesAll