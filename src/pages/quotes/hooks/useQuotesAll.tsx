import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'

import { QUOTES_ALL_TEXT } from '../constants'
import decOfNum, { quoteWords } from 'helpers/decOfNum'
import useResponse from 'helpers/useResponse'
import {
  getQuotes,
  searchQuote,
} from 'utils/quotes'

import { IStore } from 'services'
import { IQuote } from 'services/quotes/reducer'

const useQuotesAll = () => {
  const [search, setSearch] = useState<string>('')
  const quotes = useSelector((store: IStore) => store.quotesStore.quotes)
  const count = useSelector((store: IStore) => store.quotesStore.quotesCount)
  const loading = useSelector((store: IStore) => store.notificationsStore.loading.getQuotes)
  const description = `${QUOTES_ALL_TEXT} ${count} ${decOfNum(count, quoteWords)} от 4 авторов`

  const quotesFirstColumn: IQuote[] = quotes.filter((quote, index) => index % 2 === 0)
  const quotesSecondColumn: IQuote[] = quotes.filter((quote, index) => index % 2 !== 0)

  let timerID: ReturnType<typeof setTimeout>;

  const hasMoreQuotes = count > quotes.length

  const handleChangeSearch = (e: React.FormEvent<HTMLInputElement>) => {
    clearInterval(timerID)

    setSearch(e.currentTarget.value)

    if (e.currentTarget.value.length > 3) {
      timerID = setTimeout(() => searchQuote(search), 1000)
    }
  }

  const {
    isLoading,
    isError,
    isSuccess
  } = useResponse({
    loading,
    count,
  })

  useEffect(() => {
    getQuotes()
  }, [])

  return {
    description,
    quotesFirstColumn,
    quotesSecondColumn,
    isLoading,
    isError,
    isSuccess,
    hasMoreQuotes,
    handleChangeSearch,
    search,
  }
}

export default useQuotesAll