import React, { useEffect } from 'react'

import { IQuote } from 'services/quotes/reducer'
import { getLastQuotes } from 'utils/quotes'

interface IUseQuotes {
  quotes: IQuote[]
}


const useQuotes = ({
  quotes,
}: IUseQuotes) => {
  let quotesFirstColumn: IQuote[] = quotes.filter((quote, index) => index % 2 === 0)
  let quotesSecondColumn: IQuote[] = quotes.filter((quotes, index) => index % 2 !== 0)

  useEffect(() => {
    getLastQuotes()
  }, [])

  return {
    quotesFirstColumn,
    quotesSecondColumn,
  }
}

export default useQuotes