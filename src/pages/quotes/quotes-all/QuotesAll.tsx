import React from 'react'
import Masonry from 'react-masonry-css'

import Skeleton from './partials/Skeleton'
import Quote from 'components/quote'
import Information, { DefaultMessage } from 'components/Information'
import Title from './partials/Title'
import useQuotesAll from '../hooks/useQuotesAll'
import Filters from './filters/Filters'
import SearchInput from './partials/SearhcInput'
import Empty from './empty/Empty'
import Pagination from 'components/pagination'
import { Stores } from 'services'

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
          <div className={styles.section}>
            {search.length > 2 && loadingSearch.isEmpty && !hasSearchQuotes && (
              <Empty />
            )}
            {search.length < 3 && loadingQuotes.isSuccess && (
              <Masonry
                breakpointCols={2}
                className="my-masonry-grid"
                columnClassName='my-masonry-grid_column'
              >
                {quotesAll.map((quote) => (
                  <Quote
                    key={quote.id_quote}
                    quote={quote}
                  />
                ))}
              </Masonry>
            )}
            {loadingQuotes.isLoading && (
              <Skeleton />
            )}
            {loadingQuotes.isError && (
              <Information text={DefaultMessage.error} />
            )}
          </div>
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