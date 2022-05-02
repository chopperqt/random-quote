import { actions } from './actions'

const {
  GET_AUTHORS,
} = actions

const initialState = {
  authors: [],
  authorsCount: 0,
}

export interface AuthorsStore {
  authors: IAuthor[]
  authorsCount: number
}

export interface IAuthor {
  created_at: string
  id_author: number
  name: string
  path: string
}

const authorsStore = (
  state = initialState,
  { type, payload }: { type: string, payload: any }
) => {
  switch (type) {
    case GET_AUTHORS: {
      return {
        ...state,
        authors: payload.data,
        authorsCount: payload.count,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default authorsStore