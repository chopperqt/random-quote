export const actions = {
  GET_RANDOM_QUOTE: 'GET_RANDOM_QUOTE',
  GET_LAST_QUOTES: 'GET_LAST_QUOTES',
  GET_QUOTES: 'GET_QUOTES',
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
  }
}