export const actions = {
  GET_RANDOM_QUOTE: 'GET_RANDOM_QUOTE',
  GET_LAST_QUOTES: 'GET_LAST_QUOTES',
  GET_QUOTES: 'GET_QUOTES',
  SEARCH_QUOTES: 'SEARCH_QUOTES',
  UPDATE_RANDOM_QUOTE: 'UPDATE_RANDOM_QUOTE'
}

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
  getRandomQuote<T>(data: T) {
    return {
      type: actions.GET_RANDOM_QUOTE,
      payload: data,
    }
  },
  quotesSearch<T>(data: T) {
    return {
      type: actions.SEARCH_QUOTES,
      payload: data,
    }
  },
  updateRandomQuote<T>(data: T) {
    return {
      type: actions.UPDATE_RANDOM_QUOTE,
      payload: data,
    }
  }
}