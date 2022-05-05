import { actions } from './actions'
import produce from 'immer'

const {
  SET_QUOTE,
  SET_ALL_QUOTES,
  SET_LAST_QUOTES,
  SEARCH_QUOTES,
  UPDATE_QUOTES,
  CLEAR_QUOTES,
  INCREASE_QUOTE_COUNTER,
  DECREASE_QUOTE_COUNTER,
  SET_COUNTER,
} = actions

const initialState = {
  quotes: [],
  quotesAll: [],
  quotesIds: [],
  lastQuotes: [],
  quotesSearch: [],
  quoteCounter: 0,
  quotesCount: 0,
  lastQuotesCount: 0,
  quotesAllCount: 0,
}

export interface QuotesStore extends QuotesCounters {
  quotes: QuoteData[]
  quotesAll: QuoteData[]
  quotesIds: number[]
  quotesSearch: QuoteData[]
  lastQuotes: QuoteData[]
}

export interface QuotesCounters {
  quotesAllCount: number
  quoteCounter: number
  quotesCount: number
  lastQuotesCount: number
}

export interface QuoteData {
  author: {
    path: string,
    name: string
  },
  created_at: string,
  data: string,
  id_quote: number,
  id_author: number,
  text: string,
  name: string,
  path: string
  rating: number
  bookmarked?: boolean
}

const quotesStore = (state = initialState, { type, payload }: { type: string, payload: any }) => {
  switch (type) {
    case SET_ALL_QUOTES: {
      const { data, count } = payload

      return {
        ...state,
        quotesAll: [...data],
        quotesAllCount: count,
      }
    }
    case SET_LAST_QUOTES: {
      const { data, count } = payload

      return {
        ...state,
        lastQuotes: data,
        lastQuotesCount: count,
      }
    }
    case SET_QUOTE: {
      return {
        ...state,
        quotes: [
          ...state.quotes,
          payload[0],
        ],
      }
    }
    case SEARCH_QUOTES: {
      return {
        ...state,
        quotesSearch: payload
      }
    }
    case UPDATE_QUOTES: {
      const { bookmarked } = payload

      const setBookmark = produce((draft: QuoteData[], id) => {
        const quote = draft.find((q) => q.id_quote === id)

        if (quote) {
          quote.bookmarked = bookmarked
        }
      })

      return {
        ...state,
        lastQuotes: setBookmark(state.lastQuotes, payload.id),
        quotes: setBookmark(state.quotes, payload.id),
      }
    }
    case CLEAR_QUOTES: {
      return {
        ...state,
        quotes: [],
        lastQuotes: [],
      }
    }
    case INCREASE_QUOTE_COUNTER: {
      return {
        ...state,
        quoteCounter: state.quoteCounter + 1
      }
    }
    case DECREASE_QUOTE_COUNTER: {
      return {
        ...state,
        quoteCounter: state.quoteCounter - 1,

      }
    }
    case SET_COUNTER: {
      return {
        ...state,
        [payload.type]: payload.data
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default quotesStore