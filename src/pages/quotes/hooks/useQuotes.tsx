import React, { useEffect } from 'react'

import { IQuote } from 'services/quotes/reducer'
import { getQuotesLast } from 'utils/quotes'
import decOfNum, { quoteWords } from 'helpers/decOfNum'
import { LAST_UPDATE_QUOTES_DESCRIPTION } from '../constants'

interface IUseQuotes {
  quotes: IQuote[]
  lastQuotesCount?: number
}


const useQuotes = ({
  quotes,
  lastQuotesCount = 0,
}: IUseQuotes) => {
  let quotesFirstColumn: IQuote[] = quotes.filter((quote, index) => index % 2 === 0)
  let quotesSecondColumn: IQuote[] = quotes.filter((quote, index) => index % 2 !== 0)

  const lastQuotesDescription = `${lastQuotesCount} ${decOfNum(lastQuotesCount, quoteWords)} ${LAST_UPDATE_QUOTES_DESCRIPTION}`

  useEffect(() => {
    getQuotesLast()
  }, [])

  return {
    lastQuotesDescription,
    quotesFirstColumn,
    quotesSecondColumn,
  }
}

export default useQuotes