import { updateUrlParams } from "helpers/urlParams"
import Store, { quoteMethods } from "services"
import { getRandomQuote } from "utils/quotes"
import { IQuotesStore } from "."

export const actions = {
  SET_QUOTE: 'SET_QUOTE',
  GET_LAST_QUOTES: 'GET_LAST_QUOTES',
  GET_QUOTES: 'GET_QUOTES',
  SEARCH_QUOTES: 'SEARCH_QUOTES',
  UPDATE_QUOTES: 'UPDATE_QUOTES',
  UPDATE_LAST_QUOTE: 'UPDATE_LAST_QUOTE',
  CLEAR_QUOTES: 'CLEAR_QUOTE',
  INCREASE_QUOTE_COUNTER: 'INCREASE_QUOTE_COUNTER',
  DECREASE_QUOTE_COUNTER: 'DECREASE_QUOTE_COUNTER',
}

export type TActions = 'quotes' | 'randomQuote' | 'lastQuotes'

export const methods = {
  getQuotes<T>(data: T) {
    return {
      type: actions.GET_QUOTES,
      payload: data,
    }
  },
  getLastQuotes<T>(data: T) {
    return {
      type: actions.GET_LAST_QUOTES,
      payload: data,
    }
  },
  setQuote<T>(data: T) {
    return {
      type: actions.SET_QUOTE,
      payload: data,
    }
  },
  quotesSearch<T>(data: T) {
    return {
      type: actions.SEARCH_QUOTES,
      payload: data,
    }
  },
  updateQuotes(bookmarked: boolean, id: number) {
    return {
      type: actions.UPDATE_QUOTES,
      payload: { bookmarked, id },
    }
  },
  increaseQuoteCounter() {
    return {
      type: actions.INCREASE_QUOTE_COUNTER,
      payload: {}
    }
  },
  decreaseQuoteCounter() {
    return {
      type: actions.DECREASE_QUOTE_COUNTER,
      payload: {}
    }
  },
  clearQuotes() {
    return {
      type: actions.CLEAR_QUOTES,
      payload: {}
    }
  }
}

type QuoteCounter = Pick<IQuotesStore, 'quoteCounter' | 'quotes'>

export const increaseQuoteCounter = async () => {
  const { quotesStore } = Store.getState()
  const {
    quotes,
    quoteCounter,
  }: QuoteCounter = quotesStore

  const quotesLength = quotes.length - 1

  if (quoteCounter >= quotesLength) {
    console.log(quotes)
    const isSuccess = await getRandomQuote()

    if (isSuccess) {
      Store.dispatch(quoteMethods.increaseQuoteCounter())

      console.log(quoteCounter)

      updateUrlParams({ qq: quotes[quoteCounter].id_quote })
    }

    return
  }

  Store.dispatch(quoteMethods.increaseQuoteCounter())

  updateUrlParams({ qq: quotes[quoteCounter + 1].id_quote })
}

export const decreaseQuoteCounter = () => {
  const { quotesStore } = Store.getState()
  const {
    quotes,
    quoteCounter
  }: QuoteCounter = quotesStore

  if (quoteCounter !== 0) {
    Store.dispatch(quoteMethods.decreaseQuoteCounter())

    updateUrlParams({ qq: quotes[quoteCounter - 1].id_quote })
  }
}

