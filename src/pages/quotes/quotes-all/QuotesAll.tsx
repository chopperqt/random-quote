import React from 'react'

import Title from './partials/Title'
import useQuotesAll from '../hooks/useQuotesAll'
import Filters from './filters/Filters'
import SearchInput from './partials/SearhcInput'
import Pagination from 'components/pagination'
import { Stores } from 'services'
import QuotesAllList from './quotes-all-list/QuotesAllList'
import QuotesAllSearch from './quotes-all-search/QuotesAllSearch'

import styles from './QuotesAll.module.scss'
import './Grid.scss'

const QuotesAll = () => {
  const { QuoteStore } = Stores()
  const { quotesAll } = QuoteStore
  const {
    description,
    search,
    setSearch,
    loadingSearch,
    loadingQuotes,
    hasSearchQuotes,
    currentPage,
    pages,
    handleSetPage,
  } = useQuotesAll()

  return (
    <div className="container">
      <Title text={description} />
      <SearchInput
        classNameWrap={styles.field}
        loading={loadingSearch.isLoading}
        value={search}
        onChangeText={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(e.target.value)
        }}
        onClear={() => setSearch('')}
      />
      <div className={styles.allQuotes}>
        <Filters />
        <div className={styles.allQuotesWrap}>
          {!search && (
            <QuotesAllList
              items={quotesAll}
              isLoading={loadingQuotes.isLoading}
              isEmpty={loadingQuotes.isEmpty}
              isError={loadingQuotes.isError}
              isSuccess={loadingQuotes.isSuccess}
            />
          )}
          {search && (
            <QuotesAllSearch
              items={quotesAll}
              isSuccess={loadingSearch.isSuccess}
              isError={loadingSearch.isError}
              isEmpty={loadingSearch.isEmpty}
              isLoading={loadingSearch.isLoading}
            />
          )}
          <Pagination
            onClick={handleSetPage}
            page={currentPage}
            pages={pages}
          />
        </div>
      </div>
    </div>
  )
}

export default QuotesAll