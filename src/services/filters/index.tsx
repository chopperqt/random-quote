import { deleteUrlParam, updateUrlParams } from 'helpers/urlParams'
import produce from 'immer'

import { actions } from './actions'

export interface FiltersStore {
  filters: {
    authors?: number[]
    p?: string
  }
}

const {
  GET_FILTERS_FROM_URL,
  UPDATE_FILTERS,
} = actions

const initialState = {
  filters: {}
}

const filtersStore = (state = initialState, { type, payload }: { type: string, payload: any }) => produce(state, (draft: FiltersStore) => {
  switch (type) {
    case GET_FILTERS_FROM_URL: {
      draft.filters = payload

      break;
    }
    case UPDATE_FILTERS: {
      draft.filters = {
        ...draft.filters,
        ...payload,
      }

      updateUrlParams(draft.filters)

      if (!draft.filters.authors?.length) {
        deleteUrlParam('authors')

      }

      break;
    }
    default: {
      break;
    }
  }
})

export default filtersStore