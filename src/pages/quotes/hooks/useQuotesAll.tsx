import {
  useEffect,
  useState,
  useMemo,
  useRef,
} from 'react'

import { QUOTES_ALL_TEXT } from '../constants'
import decOfNum, { quoteWords } from 'helpers/decOfNum'
import { getRange } from 'helpers/pagination'
import useResponse from 'helpers/useResponse'
import {
  getQuotes, searchQuote
} from 'utils/quotes'
import { QuotesRequests } from 'models/quotes.type'
import useUser from 'helpers/useUser'
import Store, { filterMethods, notificationMethods, Stores } from 'services'
import {
  deleteUrlParam,
  getUrlParam,
} from 'helpers/urlParams'


const useQuotesAll = () => {
  const searchParam = getUrlParam('search')
  const formattedSearchParam = searchParam ? JSON.parse(searchParam) : ''
  const [search, setSearch] = useState<string>(formattedSearchParam)
  const { user } = useUser()
  const {
    QuoteStore: {
      quotesAll,
      quotesSearch,
      quotesCount,
      quotesAllCount,
      quotesSearchCount,
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
  const prevPage = useRef(filters.p)
  //const pages = Math.ceil(quotesAllCount / 10)
  let authors: number[] = []
  const {
    from,
    to,
  } = getRange(currentPage)

  if (authorsQuery) {
    authors = JSON.parse(authorsQuery)
  }

  const pages = useMemo(() => {
    if (search.length !== 0) {
      return Math.ceil(quotesSearchCount / 10)
    }

    return Math.ceil(quotesAllCount / 10)
  }, [
    search,
    quotesSearchCount,
    quotesAllCount,
  ])

  const handleClearInput = () => {
    setSearch('')

    deleteUrlParam('search')
  }

  const loadingQuotes = useResponse({
    loading: loading.getQuotes,
    count: quotesAll.length,
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

  useEffect(() => {
    if (prevPage.current !== filters.p) {
      getQuotes({
        id: user?.id,
        from,
        to,
        authors,
      })
    }
  }, [filters.p])

  useEffect(() => {
    if (search) {
      searchQuote({
        search,
      })

      return
    }

    deleteUrlParam('search')
    deleteUrlParam('p')
  }, [search])

  return {
    description,
    hasMoreQuotes,
    setSearch,
    handleSetPage,
    handleClearInput,
    search,
    quotesSearch,
    loadingSearch,
    loadingQuotes,
    currentPage,
    pages,
  }
}

export default useQuotesAll