export const actions = {
  GET_RANDOM_QUOTE: 'GET_RANDOM_QUOTE'
}

export const methods = {
  getRandomQuote<T>(data: T) {
    return {
      type: actions.GET_RANDOM_QUOTE,
      payload: data,
    }
  }
}