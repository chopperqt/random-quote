import { getUrlParams } from 'helpers/urlParams'
import Store from 'services'


const actions = {
  GET_FILTERS_FROM_URL: 'GET_FILTERS_FROM_URL',
  UPDATE_FILTERS: 'UPDATE_FILTERS'
}

const methods = {
  getFiltersFromUrl,
}

function getFiltersFromUrl() {
  const filters = getUrlParams() || {}

  Object.entries(filters).forEach(([key, value]) => {
    filters[key] = JSON.parse(value)
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