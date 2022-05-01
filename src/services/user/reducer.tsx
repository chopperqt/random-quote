
import { actions } from './actions'

const {
  SET_USER,
} = actions

const initialState = {
  email: '',
  id: '',
  role: '',
  avatar_url: '',
}

export type UserStore = typeof initialState

const userStore = (state = initialState, { type, payload }: { type: string, payload: any }) => {
  switch (type) {
    case SET_USER: {
      return {
        ...state,
        ...payload,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default userStore