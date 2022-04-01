import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { QUOTES_ALL_TEXT } from '../constants'
import decOfNum, { quoteWords } from 'helpers/decOfNum'
import useResponse from 'helpers/useResponse'
import { getQuotes } from 'utils/quotes'

import { IStore } from 'services'
import { IQuote } from 'services/quotes/reducer'

const useQuotesAll = () => {
  const quotes = useSelector((store: IStore) => store.quotesStore.quotes)
  const count = useSelector((store: IStore) => store.quotesStore.quotesCount)
  const loading = useSelector((store: IStore) => store.notificationsStore.loading.getQuotes)
  const description = `${QUOTES_ALL_TEXT} ${count} ${decOfNum(count, quoteWords)} от 4 авторов`


  const quotesFirstColumn: IQuote[] = quotes.filter((quote, index) => index % 2 === 0)
  const quotesSecondColumn: IQuote[] = quotes.filter((quote, index) => index % 2 !== 0)

  const hasMoreQuotes = count > quotes.length

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
  }
}

export default useQuotesAll