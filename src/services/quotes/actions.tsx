import Store, { quoteMethods } from "services"
import { UserID } from "utils/auth"
import { getRandomQuote } from "utils/quotes"
import {
  QuoteData,
  QuotesCounters,
  QuotesStore,
} from "./QuotesStore"

const actions = {
  SET_QUOTE: 'SET_QUOTE',
  SET_LAST_QUOTES: 'SET_LAST_QUOTES',
  SET_ALL_QUOTES: 'SET_ALL_QUOTES',
  SEARCH_QUOTES: 'SEARCH_QUOTES',
  UPDATE_QUOTES: 'UPDATE_QUOTES',
  UPDATE_LAST_QUOTE: 'UPDATE_LAST_QUOTE',
  CLEAR_QUOTES: 'CLEAR_QUOTES',
  INCREASE_QUOTE_COUNTER: 'INCREASE_QUOTE_COUNTER',
  DECREASE_QUOTE_COUNTER: 'DECREASE_QUOTE_COUNTER',
  SET_COUNTER: 'SET_COUNTER',
}

export type QuotesActions = keyof typeof actions

export type TActions = 'quotes' | 'randomQuote' | 'lastQuotes'

interface DefaultReturnData {
  data: QuoteData[]
  count: number
}

interface DefaultUpdateProps {
  bookmarked: boolean,
  id: number
}

export const methods = {
  setAllQuotes(payload: DefaultReturnData) {
    return {
      type: actions.SET_ALL_QUOTES,
      payload,
    }
  },
  setLastQuotes(payload: DefaultReturnData) {
    return {
      type: actions.SET_LAST_QUOTES,
      payload,
    }
  },
  setQuote(payload: QuoteData[]) {
    return {
      type: actions.SET_QUOTE,
      payload,
    }
  },
  quotesSearch(payload: DefaultReturnData) {
    return {
      type: actions.SEARCH_QUOTES,
      payload,
    }
  },
  updateQuotes(payload: DefaultUpdateProps) {
    return {
      type: actions.UPDATE_QUOTES,
      payload,
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

export const increaseQuoteCounter = async (userID?: UserID) => {
  const {
    quotesStore,
    notificationsStore,
  } = Store.getState()
  const {
    quotes,
    quotesCount,
    currentQuote,
  } = quotesStore
  const { loading: { getQuote: { status } } } = notificationsStore


  if (status === 'PENDING') {
    return
  }

  if (currentQuote === quotes.length - 1) {
    const response = await getRandomQuote()

    if (typeof response === 'boolean') {
      Store.dispatch(quoteMethods.setCounter(quotes.length, 'currentQuote'))
    }

    return
  }

  Store.dispatch(quoteMethods.increaseQuoteCounter())
}

export const decreaseQuoteCounter = () => {
  const {
    quotesStore: {
      currentQuote,
    }
  } = Store.getState()


  if (currentQuote !== 0) {
    Store.dispatch(quoteMethods.decreaseQuoteCounter())
  }
}

