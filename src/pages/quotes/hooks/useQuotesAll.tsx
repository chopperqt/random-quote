import { useEffect, useState } from 'react'

import { QUOTES_ALL_TEXT } from '../constants'
import decOfNum, { quoteWords } from 'helpers/decOfNum'
import { getRange } from 'helpers/pagination'
import useResponse from 'helpers/useResponse'
import {
  getQuotes,
} from 'utils/quotes'
import useUser from 'helpers/useUser'
import { getUrlParam } from 'helpers/urlParams'

import Store, {
  quoteMethods,
  Stores,
} from 'services'
import { QuoteData } from 'services/quotes'

const useQuotesAll = () => {
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState<number>(Number(getUrlParam('p')) || 1)
  const { user } = useUser()
  const {
    QuoteStore: {
      quotesAll,
      quotesSearch,
      quotesCount,
    },
    NotificationStore: {
      loading,
    }
  } = Stores()
  const description = `${QUOTES_ALL_TEXT} ${quotesCount} ${decOfNum(quotesCount, quoteWords)} от 4 авторов`
  const quoteItems = quotesSearch.length > 0 && search.length > 2 ? quotesSearch : quotesAll
  const quotesFirstColumn: QuoteData[] = quoteItems.filter((quote, index) => index % 2 === 0)
  const quotesSecondColumn: QuoteData[] = quoteItems.filter((quote, index) => index % 2 !== 0)
  const hasMoreQuotes = quotesCount > quotesAll.length
  const hasSearchQuotes = quotesSearch.length > 0
  const pages = Math.ceil(quotesCount / 10)
  const {
    from,
    to,
  } = getRange(page)

  const loadingQuotes = useResponse({
    loading: loading.getQuotes,
    count: quotesCount,
  })

  const loadingSearch = useResponse({
    loading: loading.searchQuote,
    count: quotesSearch.length,
  })

  useEffect(() => {
    if (user) {
      getQuotes({
        id: user.id,
        from,
        to,
      })

      return
    }

    getQuotes({
      from,
      to,
    })
  }, [page])

  const handleChangePage = (page?: number) => {
    setPage(page || 1)
  }

  useEffect(() => {
    if (search.length > 2) {
      // searchQuote(search)
    }
  }, [search])

  useEffect(() => {
    return () => {
      Store.dispatch(quoteMethods.clearQuotes())
    }
  }, [])

  return {
    description,
    quotesFirstColumn,
    quotesSecondColumn,
    hasMoreQuotes,
    setSearch,
    handleChangePage,
    search,
    quotesSearch,
    hasSearchQuotes,
    loadingSearch,
    loadingQuotes,
    currentPage: page,
    pages,
  }
}

export default useQuotesAll