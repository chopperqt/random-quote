import { actions } from './actions'

const {
  SET_QUOTE,
  GET_QUOTES,
  GET_LAST_QUOTES,
  SEARCH_QUOTES,
  UPDATE_QUOTES,
  CLEAR_QUOTES,
  INCREASE_QUOTE_COUNTER,
  DECREASE_QUOTE_COUNTER,
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
}

export interface QuotesStore {
  quotes: QuoteData[]
  quotesAll: QuoteData[]
  quoteCounter: number
  quotesIds: number[]
  quotesCount: number
  quotesSearch: QuoteData[]
  lastQuotes: QuoteData[]
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
    case GET_QUOTES: {
      return {
        ...state,
        quotes: [...payload.data],
        quotesCount: payload.count,
      }
    }
    case GET_LAST_QUOTES: {
      return {
        ...state,
        lastQuotes: payload.data,
        lastQuotesCount: payload.count
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
      const findLastQuoteIndex: number = state.lastQuotes.findIndex((item: QuoteData) => item.id_quote === payload.id)
      const findQuote: number = state.quotes.findIndex((item: QuoteData) => item.id_quote === payload.id)

      const { bookmarked } = payload

      let modifyLastQuote: QuoteData[] = state.lastQuotes
      let modifyQuote: QuoteData[] = state.quotes

      if (typeof findLastQuoteIndex === 'number') {
        modifyLastQuote[findLastQuoteIndex] = {
          ...modifyLastQuote[findLastQuoteIndex],
          bookmarked,
        }
      }

      if (typeof findQuote === 'number') {
        modifyQuote[findQuote] = {
          ...modifyQuote[findQuote],
          bookmarked,
        }
      }

      return {
        ...state,
        lastQuotes: modifyLastQuote,
        quotes: modifyQuote,
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
    default: {
      return {
        ...state,
      }
    }
  }
}

export default quotesStore