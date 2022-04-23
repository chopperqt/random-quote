export const actions = {
  SET_QUOTE: 'SET_QUOTE',
  GET_LAST_QUOTES: 'GET_LAST_QUOTES',
  GET_QUOTES: 'GET_QUOTES',
  SEARCH_QUOTES: 'SEARCH_QUOTES',
  UPDATE_QUOTES: 'UPDATE_QUOTES',
  UPDATE_LAST_QUOTE: 'UPDATE_LAST_QUOTE',
  CLEAR_QUOTES: 'CLEAR_QUOTE',
}

export type TActions = 'quotes' | 'randomQuote' | 'lastQuotes'

export const methods = {
  getQuotes<T>(data: T) {
    return {
      type: actions.GET_QUOTES,
      payload: data,
    }
  },
  getLastQuotes<T>(data: T) {
    return {
      type: actions.GET_LAST_QUOTES,
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
  clearQuotes() {
    return {
      type: actions.CLEAR_QUOTES,
      payload: {}
    }
  }
}