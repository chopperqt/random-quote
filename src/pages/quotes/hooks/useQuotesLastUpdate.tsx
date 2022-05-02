import { useEffect } from 'react'

import { getQuotesLast } from 'utils/quotes'
import decOfNum, { quoteWords } from 'helpers/decOfNum'
import {
  LAST_UPDATE_QUOTES_DESCRIPTION,
  LAST_QUOTES_PER_PAGE,
} from '../constants'
import useResponse from 'helpers/useResponse'
import { Stores } from 'services'
import { QuoteData } from 'services/quotes'

const useQuotesLastUpdate = () => {
  const {
    NotificationStore: {
      loading: {
        getQuotesLast: loading,
      }
    },
    QuoteStore: {
      lastQuotes,
      lastQuotesCount: count,
    }
  } = Stores()

  const quotesFirstColumn: QuoteData[] = lastQuotes.filter((quote, index) => index % 2 === 0)
  const quotesSecondColumn: QuoteData[] = lastQuotes.filter((quote, index) => index % 2 !== 0)
  const lastQuotesDescription = `${count} ${decOfNum(count, quoteWords)} ${LAST_UPDATE_QUOTES_DESCRIPTION}`

  const {
    isEmpty,
    isLoading,
    isError,
    isSuccess,
    hasStatus,
  } = useResponse({
    loading,
    count,
  })

  const isMoreButton = count > LAST_QUOTES_PER_PAGE

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
    hasStatus,
  }
}

export default useQuotesLastUpdate