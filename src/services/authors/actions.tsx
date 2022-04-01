

export const actions = {
  GET_AUTHORS: 'GET_AUTHORS',
}

export const methods = {
  getAuthors<T>(data: T) {
    return {
      type: actions.GET_AUTHORS,
      payload: data,
    }
  }
}