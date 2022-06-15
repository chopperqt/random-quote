import produce from 'immer'

import { QuotesApi } from 'utils/quotes'
import { QuotesActions } from './actions'

const initialState = {
  quotes: [],
  quotesAll: [],
  quotesIds: [],
  lastQuotes: [],
  quotesSearch: [],
  quotesSearchCount: 0,
  quotesCount: 0,
  lastQuotesCount: 0,
  quotesAllCount: 0,
  quotesControl: 0,
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
  quotesSearchCount: number
  quotesControl: number
}

export interface QuoteData extends QuotesApi {
  bookmarked?: boolean
}

export interface PayloadData {
  type: QuotesActions
  payload: any
}

export type Quote = Partial<QuoteData>

const quotesStore = (
  state = initialState,
  { type, payload }: PayloadData
) => produce(state, (draft: QuotesStore) => {
  switch (type) {
    case 'SET_ALL_QUOTES': {
      const { data, count } = payload

      draft.quotesAll = data
      draft.quotesAllCount = count

      break;
    }
    case 'SET_LAST_QUOTES': {
      const { data, count } = payload

      draft.lastQuotes = data
      draft.lastQuotesCount = count

      break;
    }
    case 'SET_QUOTE': {
      draft.quotes.push(payload[0])

      break;
    }
    case 'SEARCH_QUOTES': {
      const { data, count } = payload

      draft.quotesSearch = data
      draft.quotesSearchCount = count

      break;
    }
    case 'UPDATE_QUOTES': {
      const {
        bookmarked,
        id,
      } = payload

      const updateLastQuotes = draft.lastQuotes.find((q) => q.id_quote === id)
      const updateQuotes = draft.quotes.find((q) => q.id_quote === id)
      const updateAllQuotes = draft.quotesAll.find((q) => q.id_quote === id)

      if (updateLastQuotes) {
        updateLastQuotes.bookmarked = bookmarked
      }

      if (updateQuotes) {
        updateQuotes.bookmarked = bookmarked
      }

      if (updateAllQuotes) {
        updateAllQuotes.bookmarked = bookmarked
      }

      break;
    }
    case 'INCREASE_QUOTE_COUNTER': {
      draft.quotesControl++

      break;
    }
    case 'DECREASE_QUOTE_COUNTER': {
      draft.quotesControl--

      break;
    }
    case 'SET_COUNTER': {
      // TODO: Отрефакторить
      // @ts-ignore
      draft[payload.type] = payload.data

      break;
    }
    case 'CLEAR_QUOTES': {
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