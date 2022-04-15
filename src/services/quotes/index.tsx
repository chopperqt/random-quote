import { findLastIndex } from 'lodash'
import { actions } from './actions'

const {
  GET_RANDOM_QUOTE,
  GET_QUOTES,
  GET_LAST_QUOTES,
  SEARCH_QUOTES,
  UPDATE_RANDOM_QUOTE,
  UPDATE_LAST_QUOTE,
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

export interface IQuote {
  created_at: string,
  data: string,
  id_quote: number,
  id_author: number,
  text: string,
  author: IAuthor
  likes: number
}

interface IAuthor {
  name: string
  path: string
}

const quotesStore = (state = initialState, { type, payload }: { type: string, payload: any }) => {
  switch (type) {
    case GET_QUOTES: {
      return {
        ...state,
        quotes: [...state.quotes, ...payload.data],
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
    case UPDATE_RANDOM_QUOTE: {
      const findLastQuoteIndex = state.lastQuotes.findIndex((item: IQuote) => item.id_quote === payload.id)
      const findQuote = state.quotes.findIndex((item: IQuote) => item.id_quote === payload.id)

      const modifyRandomQuote = {
        ...state.quote,
        likes: payload.data[0].likes,
      }

      let modifyLastQuote: IQuote[] = state.lastQuotes
      let modifyQuote: IQuote[] = state.quotes

      if (typeof findLastQuoteIndex === 'number') {
        modifyLastQuote[findLastQuoteIndex] = {
          ...modifyLastQuote[findLastQuoteIndex],
          likes: payload.data[0].likes,
        }
      }

      if (typeof findQuote === 'number') {
        modifyQuote[findQuote] = {
          ...modifyQuote[findQuote],
          likes: payload.data[0].likes
        }
      }

      return {
        ...state,
        quote: modifyRandomQuote,
        lastQuotes: modifyLastQuote,
        quotes: modifyQuote,
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