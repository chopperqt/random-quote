import React from 'react'

import Skeleton from './skeleton/Skeleton'
import Quote from 'components/quote'
import Button from 'components/button'
import {
  SHOW_MORE_TEXT,
  EMPTY_TEXT
} from '../constants'
import Information, { DefaultMessage } from 'components/Information'
import { useQuotesLastUpdate } from '../hooks'

import styles from './QuotesLastUpdate.module.scss'
import Title from './partials/Title'

const QuotesLastUpdate = () => {
  const {
    isEmpty,
    isError,
    isLoading,
    isSuccess,
    lastQuotesDescription,
    quotesFirstColumn,
    quotesSecondColumn,
    isMoreButton
  } = useQuotesLastUpdate()

  return (
    <div className="container">
      <Title
        description={lastQuotesDescription}
      />
      <div className={styles.quotesWrap}>
        <div className={styles.quotes}>
          {isLoading && (
            <Skeleton />
          )}
          {isEmpty && (
            <Information text={EMPTY_TEXT} />
          )}
          {isError && (
            <Information text={DefaultMessage.error} />
          )}
          {isSuccess && (
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
          {isMoreButton && (
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