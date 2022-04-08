import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import debounce from 'lodash.debounce'

import { QUOTES_ALL_TEXT } from '../constants'
import decOfNum, { quoteWords } from 'helpers/decOfNum'
import useResponse from 'helpers/useResponse'
import {
  getQuotes,
  searchQuote,
  getQuotesMore,
} from 'utils/quotes'
import {
  updateUrlParams,
  getUrlParam,
} from 'helpers/urlParams'


import Store, { IStore } from 'services'
import { IQuote } from 'services/quotes'

const useQuotesAll = () => {
  const [search, setSearch] = useState<string>('')
  const quotes = useSelector((store: IStore) => store.quotesStore.quotes)
  const quotesSearch = useSelector((store: IStore) => store.quotesStore.quotesSearch)
  const count = useSelector((store: IStore) => store.quotesStore.quotesCount)
  const loading = useSelector((store: IStore) => store.notificationsStore.loading.getQuotes)
  const loadingMore = useSelector((store: IStore) => store.notificationsStore.loading.getQuotesMore)
  const loadingSearch = useSelector((store: IStore) => store.notificationsStore.loading.searchQuote)
  const description = `${QUOTES_ALL_TEXT} ${count} ${decOfNum(count, quoteWords)} от 4 авторов`
  const quoteItems = quotesSearch.length > 0 && search.length > 2 ? quotesSearch : quotes
  const hasSearchQuotes = quotesSearch.length > 0

  const quotesFirstColumn: IQuote[] = quoteItems.filter((quote, index) => index % 2 === 0)
  const quotesSecondColumn: IQuote[] = quoteItems.filter((quote, index) => index % 2 !== 0)

  const hasMoreQuotes = count > quotes.length
  const isLoadingMore = loadingMore === 'PENDING'

  const {
    isLoading,
    isError,
    isSuccess,
  } = useResponse({
    loading,
    count,
  })

  const searchStatuses = useResponse({
    loading: loadingSearch,
    count: quotesSearch.length,
  })

  const handleLoadMore = () => {
    const page = getUrlParam('p') || 1

    updateUrlParams({
      p: +page + 1
    })

    getQuotesMore({
      from: +page * 10,
      to: (+page + 1) * 10
    })
  }

  useEffect(() => {
    getQuotes()
  }, [])

  useEffect(() => {
    if (search.length > 2) {
      searchQuote(search)
    }
  }, [search])

  return {
    description,
    quotesFirstColumn,
    quotesSecondColumn,
    isLoading,
    isError,
    isSuccess,
    hasMoreQuotes,
    setSearch,
    search,
    loadingSearch,
    quotesSearch,
    hasSearchQuotes,
    searchStatuses,
    isLoadingMore,
    handleLoadMore,
  }
}

export default useQuotesAll