import { actions } from './actions'

const {
  GET_RANDOM_QUOTE,
  GET_QUOTES,
} = actions

const initialState = {
  quote: {},
  quotes: [],
}

export interface IQuotesStore {
  quote: IQuote
  quotes: IQuote[]
}

export interface IQuote {
  created_at: string,
  data: string,
  id_quote: number,
  id_author: number,
  text: string,
  author: IAuthor
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
        quotes: payload,
      }
    }
    case GET_RANDOM_QUOTE: {
      return {
        ...state,
        quote: payload[0],
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