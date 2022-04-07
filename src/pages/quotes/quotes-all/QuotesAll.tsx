import React from 'react'

import Skeleton from './partials/Skeleton'
import { SHOW_MORE_TEXT } from '../constants'
import Quote from 'components/quote'
import Information, { DefaultMessage } from 'components/Information'
import Button from 'components/button'
import Title from './partials/Title'
import useQuotesAll from '../hooks/useQuotesAll'
import Filters from './filters/Filters'
import SearchInput from './partials/SearhcInput'
import Empty from './empty/Empty'

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
    loadingSearch,
    hasSearchQuotes,
    searchStatuses,
  } = useQuotesAll()

  return (
    <div className="container">
      <Title text={description} />
      <SearchInput
        loading={searchStatuses.isLoading}
        className={styles.field}
        value={search}
        onChangeText={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(e.target.value)
        }}
        onClear={() => setSearch('')}
      />
      <div className={styles.allQuotes}>
        <Filters />
        <div className={styles.allQuotesWrap}>
          {search.length > 2 && searchStatuses.isEmpty && !hasSearchQuotes && (
            <Empty />
          )}
          {search.length < 3 && isSuccess && (
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