import { useEffect, useState } from 'react'

import { QUOTES_ALL_TEXT } from '../constants'
import decOfNum, { quoteWords } from 'helpers/decOfNum'
import useResponse from 'helpers/useResponse'
import {
  getQuotes,
} from 'utils/quotes'
import useUser from 'helpers/useUser'
import { getUrlParam } from 'helpers/urlParams'


import { Stores } from 'services'
import { IQuote } from 'services/quotes'

const useQuotesAll = () => {
  const [search, setSearch] = useState<string>('')
  const { user } = useUser()
  const {
    QuoteStore: {
      quotes,
      quotesSearch,
      quotesCount,
    },
    NotificationStore: {
      loading,
    }
  } = Stores()
  const description = `${QUOTES_ALL_TEXT} ${quotesCount} ${decOfNum(quotesCount, quoteWords)} от 4 авторов`
  const quoteItems = quotesSearch.length > 0 && search.length > 2 ? quotesSearch : quotes
  const quotesFirstColumn: IQuote[] = quoteItems.filter((quote, index) => index % 2 === 0)
  const quotesSecondColumn: IQuote[] = quoteItems.filter((quote, index) => index % 2 !== 0)
  const hasMoreQuotes = quotesCount > quotes.length
  const hasSearchQuotes = quotesSearch.length > 0
  const currentPage = Number(getUrlParam('p')) || 1

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
      getQuotes({ id: user.id })

      return
    }

    getQuotes({})
  }, [])

  useEffect(() => {
    if (search.length > 2) {
      // searchQuote(search)
    }
  }, [search])

  return {
    description,
    quotesFirstColumn,
    quotesSecondColumn,
    hasMoreQuotes,
    setSearch,
    search,
    quotesSearch,
    hasSearchQuotes,
    loadingSearch,
    loadingQuotes,
    currentPage,
  }
}

export default useQuotesAll