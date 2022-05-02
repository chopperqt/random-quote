import { actions } from './actions'

export interface FiltersStore {
  filters: {
    [key: string]: string
  }
}

const {
  GET_FILTERS_FROM_URL,
} = actions

const initialState = {
  filters: {}
}

const filtersStore = (state = initialState, { type, payload }: { type: string, payload: any }) => {
  switch (type) {
    case GET_FILTERS_FROM_URL: {
      return {
        ...state,
        filters: payload
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default filtersStore