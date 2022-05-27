import { getUrlParams } from 'helpers/urlParams'
import Store from 'services'

const actions = {
  GET_FILTERS_FROM_URL: 'GET_FILTERS_FROM_URL',
  UPDATE_FILTERS: 'UPDATE_FILTERS',
  UPDATE_FILTERS_COUNT: 'UPDATE_FILTERS_COUNT',
}

const methods = {
  getFiltersFromUrl,
  updateFilters(data: any) {
    return {
      type: actions.UPDATE_FILTERS,
      payload: data
    }
  },
  updateFiltersCount(count: number) {
    return {
      type: actions.UPDATE_FILTERS_COUNT,
      payload: count,
    }
  }
}

function getFiltersFromUrl() {
  const filters = getUrlParams() || {}

  Object.entries(filters).forEach(([key, value]) => {
    if (key === 'authors') {
      filters[key] = JSON.parse(value)

      return
    }

    filters[key] = value
  })

  Store.dispatch({
    type: actions.GET_FILTERS_FROM_URL,
    payload: filters,
  })
}

export {
  actions,
  methods,
}