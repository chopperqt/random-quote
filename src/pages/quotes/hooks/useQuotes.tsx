import React, { useEffect } from 'react'

import { IQuote } from 'services/quotes/reducer'
import { getLastQuotes } from 'utils/quotes'
import decOfNum, { quoteWords } from 'helpers/decOfNum'
import { LAST_UPDATE_QUOTES_DESCRIPTION } from '../constants'

interface IUseQuotes {
  quotes: IQuote[]
  lastQuotesCount: number
}


const useQuotes = ({
  quotes,
  lastQuotesCount,
}: IUseQuotes) => {
  let quotesFirstColumn: IQuote[] = quotes.filter((quote, index) => index % 2 === 0)
  let quotesSecondColumn: IQuote[] = quotes.filter((quote, index) => index % 2 !== 0)

  const lastQuotesDescription = `${lastQuotesCount} ${decOfNum(lastQuotesCount, quoteWords)} ${LAST_UPDATE_QUOTES_DESCRIPTION}`

  useEffect(() => {
    getLastQuotes()
  }, [])

  return {
    lastQuotesDescription,
    quotesFirstColumn,
    quotesSecondColumn,
  }
}

export default useQuotes