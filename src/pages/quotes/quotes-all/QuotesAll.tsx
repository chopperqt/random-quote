import React from 'react'
import cx from 'classnames'

import Skeleton from './partials/Skeleton'
import { SHOW_MORE_TEXT } from '../constants'
import Quote from 'components/quote'
import Information, { DefaultMessage } from 'components/Information'
import Button from 'components/button'
import Input from 'components/input'
import Title from './partials/Title'
import useQuotesAll from '../hooks/useQuotesAll'
import Filters from './filters/Filters'
import SearchInput from './partials/SearhcInput'

import styles from './QuotesAll.module.scss'

const QuotesAll = () => {
  const {
    isError,
    isLoading,
    isSuccess,
    description,
    quotesFirstColumn,
    quotesSecondColumn,
    hasMoreQuotes,
    search,
    setSearch,
  } = useQuotesAll()

  return (
    <div className="container">
      <Title text={description} />
      <SearchInput
        className={styles.field}
        value={search}
        onChangeText={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(e.target.value)
        }}
      />
      <div className={styles.allQuotes}>
        <Filters />
        <div className={styles.allQuotesWrap}>
          {isSuccess && (
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
          {isLoading && (
            <Skeleton />
          )}
          {isError && (
            <Information text={DefaultMessage.error} />
          )}
        </div>
      </div>
      {hasMoreQuotes && (
        <div className={styles.button}>
          <Button>
            {SHOW_MORE_TEXT}
          </Button>
        </div>
      )}
    </div>
  )
}

export default QuotesAll