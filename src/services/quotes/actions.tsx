import Store, { quoteMethods } from "services"
import { getRandomQuote } from "utils/quotes"
import {
  QuotesCounters,
  QuotesStore,
} from "."

export const actions = {
  SET_QUOTE: 'SET_QUOTE',
  SET_LAST_QUOTES: 'SET_LAST_QUOTES',
  SET_ALL_QUOTES: 'SET_ALL_QUOTES',
  SEARCH_QUOTES: 'SEARCH_QUOTES',
  UPDATE_QUOTES: 'UPDATE_QUOTES',
  UPDATE_LAST_QUOTE: 'UPDATE_LAST_QUOTE',
  CLEAR_QUOTES: 'CLEAR_QUOTE',
  INCREASE_QUOTE_COUNTER: 'INCREASE_QUOTE_COUNTER',
  DECREASE_QUOTE_COUNTER: 'DECREASE_QUOTE_COUNTER',
  SET_COUNTER: 'SET_COUNTER',
}

export type TActions = 'quotes' | 'randomQuote' | 'lastQuotes'

export const methods = {
  setAllQuotes<T>(data: T) {
    return {
      type: actions.SET_ALL_QUOTES,
      payload: data,
    }
  },
  setLastQuotes<T>(data: T) {
    return {
      type: actions.SET_LAST_QUOTES,
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
  },
  setCounter(data: number, type: keyof QuotesCounters) {
    return {
      type: actions.SET_COUNTER,
      payload: {
        data,
        type,
      },
    }
  }
}

type QuoteCounter = Pick<QuotesStore, 'quotesCount' | 'quotes'>

export const increaseQuoteCounter = async (id_user?: string) => {
  const {
    quotesStore,
    notificationsStore,
  } = Store.getState()
  const {
    quotes,
    quotesCount,
  }: QuoteCounter = quotesStore
  const { loading } = notificationsStore

  if (loading.getQuote === 'PENDING') {
    return
  }

  const quotesLength = quotes.length - 1

  if (quotesCount >= quotesLength) {
    const isSuccess = await getRandomQuote(id_user)

    if (isSuccess) {
      Store.dispatch(quoteMethods.increaseQuoteCounter())
    }

    return
  }

  Store.dispatch(quoteMethods.increaseQuoteCounter())
}

export const decreaseQuoteCounter = () => {
  const { quotesStore } = Store.getState()
  const {
    quotesCount
  }: QuoteCounter = quotesStore

  if (quotesCount !== 0) {
    Store.dispatch(quoteMethods.decreaseQuoteCounter())
  }
}

