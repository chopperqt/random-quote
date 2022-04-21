import React from 'react'

import Skeleton from './partials/Skeleton'
import Quote from 'components/quote'
import Information, { DefaultMessage } from 'components/Information'
import Title from './partials/Title'
import useQuotesAll from '../hooks/useQuotesAll'
import Filters from './filters/Filters'
import SearchInput from './partials/SearhcInput'
import Empty from './empty/Empty'
import Pagination from 'components/pagination'

import styles from './QuotesAll.module.scss'

const QuotesAll = () => {
  const {
    description,
    quotesFirstColumn,
    quotesSecondColumn,
    search,
    setSearch,
    loadingSearch,
    loadingQuotes,
    hasSearchQuotes,
    currentPage,
    pages,
    handleChangePage,
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
              <>
                <div className={styles.gridColumn}>
                  {quotesFirstColumn.map((quote) => (
                    <Quote
                      key={quote.id_quote}
                      quote={quote}
                    />
                  ))}
                </div>
                <div className={styles.gridColumn}>
                  {quotesSecondColumn.map((quote) => (
                    <Quote
                      key={quote.id_quote}
                      quote={quote}
                    />
                  ))}
                </div>
              </>
            )}
            {loadingQuotes.isLoading && (
              <Skeleton />
            )}
            {loadingQuotes.isError && (
              <Information text={DefaultMessage.error} />
            )}

          </div>
          <Pagination
            onClick={handleChangePage}
            page={currentPage}
            pages={pages}
          />
        </div>
      </div>

    </div>
  )
}

export default QuotesAll