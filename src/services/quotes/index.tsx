import { actions } from './actions'

const {
  GET_RANDOM_QUOTE,
  GET_QUOTES,
  GET_LAST_QUOTES,
  SEARCH_QUOTES,
  UPDATE_QUOTES,
  CLEAR_QUOTES,
} = actions

const initialState = {
  quote: {},
  quotes: [],
  quotesCount: 0,
  quotesSearch: [],
  lastQuotes: [],
  lastQuotesCount: 0,
}

export interface IQuotesStore {
  quote: IQuote
  quotes: IQuote[]
  quotesCount: number
  quotesSearch: IQuote[]
  lastQuotes: IQuote[]
  lastQuotesCount: number
}

export type TQuoteAction = 'like' | 'dislike'
export interface IQuote {
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
    case GET_RANDOM_QUOTE: {
      return {
        ...state,
        quote: payload[0],
      }
    }
    case SEARCH_QUOTES: {
      return {
        ...state,
        quotesSearch: payload
      }
    }
    case UPDATE_QUOTES: {
      const findLastQuoteIndex = state.lastQuotes.findIndex((item: IQuote) => item.id_quote === payload.id)
      const findQuote = state.quotes.findIndex((item: IQuote) => item.id_quote === payload.id)

      const { bookmarked } = payload

      const modifyRandomQuote = {
        ...state.quote,
        bookmarked,
      }

      let modifyLastQuote: IQuote[] = state.lastQuotes
      let modifyQuote: IQuote[] = state.quotes

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
        quote: modifyRandomQuote,
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
    default: {
      return {
        ...state,
      }
    }
  }
}

export default quotesStore