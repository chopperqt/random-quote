import { useEffect, useState } from 'react'

import { QUOTES_ALL_TEXT } from '../constants'
import decOfNum, { quoteWords } from 'helpers/decOfNum'
import useResponse from 'helpers/useResponse'
import {
  getQuotes,
  getQuotesMore,
} from 'utils/quotes'
import useUser from 'helpers/useUser'

import { Stores } from 'services'
import { IQuote } from 'services/quotes'

const useQuotesAll = () => {
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState<number>(1)
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

  const loadingQuotes = useResponse({
    loading: loading.getQuotes,
    count: quotesCount,
  })

  const loadingSearch = useResponse({
    loading: loading.searchQuote,
    count: quotesSearch.length,
  })

  const loadingMoreQuotes = useResponse({
    loading: loading.getQuotesMore,
    count: quotesCount
  })

  const handleLoadMore = () => {
    getQuotesMore({
      from: +page * 10,
      to: (+page + 1) * 10
    })

    setPage(page + 1)
  }

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
    handleLoadMore,
    loadingQuotes,
    loadingMoreQuotes,
  }
}

export default useQuotesAll