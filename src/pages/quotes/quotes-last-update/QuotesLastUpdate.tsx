import React from 'react'

import Skeleton from './partials/Skeleton'
import Quote from 'components/quote'
import { EMPTY_TEXT } from '../constants'
import Information, { DefaultMessage } from 'components/Information'
import { useQuotesLastUpdate } from '../hooks'
import Title from './partials/Title'

import styles from './QuotesLastUpdate.module.scss'

const QuotesLastUpdate = () => {
  const {
    isEmpty,
    isError,
    isLoading,
    isSuccess,
    lastQuotesDescription,
    quotesFirstColumn,
    quotesSecondColumn,
    hasStatus,
  } = useQuotesLastUpdate()

  return (
    <div className="container">
      <Title
        description={lastQuotesDescription}
      />
      <div className={styles.quotesWrap}>
        <div className={styles.quotes}>
          {(isLoading || hasStatus)! && (
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
                {quotesFirstColumn.map(({
                  text,
                  author,
                  created_at,
                  id_author,
                  id_quote,
                }) => (
                  <Quote
                    key={id_quote}
                    text={text}
                    author={author}
                    created_at={created_at}
                    id_quote={id_quote}
                    id_author={id_author}
                  />
                ))}
              </div>
              <div className={styles.gridColumn}>
                {quotesSecondColumn.map(({
                  text,
                  created_at,
                  id_author,
                  id_quote,
                  author
                }) => (
                  <Quote
                    key={id_quote}
                    text={text}
                    created_at={created_at}
                    id_quote={id_quote}
                    id_author={id_author}
                    author={author}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuotesLastUpdate