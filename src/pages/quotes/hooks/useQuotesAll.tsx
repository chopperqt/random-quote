import { useEffect, useState } from 'react'

import { QUOTES_ALL_TEXT } from '../constants'
import decOfNum, { quoteWords } from 'helpers/decOfNum'
import { getRange } from 'helpers/pagination'
import useResponse from 'helpers/useResponse'
import { getQuotes } from 'utils/quotes'
import useUser from 'helpers/useUser'
import Store, { filterMethods, Stores } from 'services'
import { getUrlParam } from 'helpers/urlParams'


const useQuotesAll = () => {
  const [search, setSearch] = useState<string>('')
  const { user } = useUser()
  const {
    QuoteStore: {
      quotesAll,
      quotesSearch,
      quotesCount,
      quotesAllCount,
    },
    NotificationStore: {
      loading,
    },
    FilterStore: {
      filters
    }
  } = Stores()
  const description = `${QUOTES_ALL_TEXT} ${quotesCount} ${decOfNum(quotesCount, quoteWords)} от 4 авторов`
  const currentPage = +(filters?.p || 1)
  const authorsQuery = getUrlParam('authors')
  const hasMoreQuotes = quotesCount > quotesAll.length
  const hasSearchQuotes = quotesSearch.length > 0
  const pages = Math.ceil(quotesAllCount / 10)
  let authors: number[] = []
  const {
    from,
    to,
  } = getRange(currentPage)

  if (authorsQuery) {
    authors = JSON.parse(authorsQuery)
  }

  const loadingQuotes = useResponse({
    loading: loading.getQuotes,
    count: quotesCount,
  })

  const loadingSearch = useResponse({
    loading: loading.searchQuote,
    count: quotesSearch.length,
  })

  const handleSetPage = (p: number) => {
    Store.dispatch(filterMethods.updateFilters({ p }))
  }

  useEffect(() => {
    getQuotes({
      id: user?.id,
      from,
      to,
      authors,
    })
  }, [])

  return {
    description,
    hasMoreQuotes,
    setSearch,
    handleSetPage,
    search,
    quotesSearch,
    hasSearchQuotes,
    loadingSearch,
    loadingQuotes,
    currentPage,
    pages,
  }
}

export default useQuotesAll