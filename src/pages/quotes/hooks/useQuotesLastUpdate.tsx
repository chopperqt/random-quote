import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getQuotesLast } from 'utils/quotes'
import decOfNum, { quoteWords } from 'helpers/decOfNum'
import {
  LAST_UPDATE_QUOTES_DESCRIPTION,
  LAST_QUOTES_PER_PAGE,
} from '../constants'
import useResponse from 'helpers/useResponse'

import { IStore } from 'services'
import { IQuote } from 'services/quotes/reducer'


const useQuotesLastUpdate = () => {
  const loadingLastQuotes = useSelector((store: IStore) => store.notificationsStore.loading.getQuotesLast)
  const lastQuotes = useSelector((store: IStore) => store.quotesStore.lastQuotes)
  const lastQuotesCount = useSelector((store: IStore) => store.quotesStore.lastQuotesCount)

  const quotesFirstColumn: IQuote[] = lastQuotes.filter((quote, index) => index % 2 === 0)
  const quotesSecondColumn: IQuote[] = lastQuotes.filter((quote, index) => index % 2 !== 0)
  const lastQuotesDescription = `${lastQuotesCount} ${decOfNum(lastQuotesCount, quoteWords)} ${LAST_UPDATE_QUOTES_DESCRIPTION}`

  const {
    isEmpty,
    isLoading,
    isError,
    isSuccess
  } = useResponse({
    loading: loadingLastQuotes,
    count: lastQuotesCount,
  })

  const isMoreButton = lastQuotesCount > LAST_QUOTES_PER_PAGE

  useEffect(() => {
    getQuotesLast()
  }, [])

  return {
    isError,
    isEmpty,
    isSuccess,
    isLoading,
    lastQuotesDescription,
    quotesFirstColumn,
    quotesSecondColumn,
    isMoreButton,
  }
}

export default useQuotesLastUpdate