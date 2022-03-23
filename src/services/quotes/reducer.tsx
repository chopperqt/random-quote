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

interface IQuote {
  created_at: string,
  data: string,
  id_quote: number,
  text: string,
  author: IAuthor
}

interface IAuthor {
  id_author: number,
  name: string
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
        quote: payload,
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