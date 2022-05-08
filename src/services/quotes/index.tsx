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

const quotesStore = (state = initialState, { type, payload }: { type: string, payload: any }) => produce(state, (draft: QuotesStore) => {
  switch (type) {
    case SET_ALL_QUOTES: {
      const { data, count } = payload

      draft.quotesAll = data
      draft.quotesAllCount = count

      break;
    }
    case SET_LAST_QUOTES: {
      const { data, count } = payload

      draft.lastQuotes = data
      draft.lastQuotesCount = count

      break;
    }
    case SET_QUOTE: {
      draft.quotes.push(payload[0])

      break;
    }
    case SEARCH_QUOTES: {
      draft.quotesSearch = payload

      break;
    }
    case UPDATE_QUOTES: {
      const {
        bookmarked,
        id,
      } = payload

      const updateLastQuotes = draft.lastQuotes.find((q) => q.id_quote === id)
      const updateQuotes = draft.quotes.find((q) => q.id_quote === id)

      if (updateLastQuotes) {
        updateLastQuotes.bookmarked = bookmarked
      }

      if (updateQuotes) {
        updateQuotes.bookmarked = bookmarked
      }

      break;
    }
    case INCREASE_QUOTE_COUNTER: {
      draft.quotesCount++

      break;
    }
    case DECREASE_QUOTE_COUNTER: {
      draft.quotesCount--

      break;
    }
    case SET_COUNTER: {
      // TODO: Отрефакторить
      // @ts-ignore
      draft[payload.type] = payload.data

      break;
    }
    case CLEAR_QUOTES: {
      draft.quotes = []
      draft.lastQuotes = []

      break;
    }
    default: {
      break;
    }
  }
})

export default quotesStore