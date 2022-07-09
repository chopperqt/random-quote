import produce from 'immer'

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

const userStore = (
  state = initialState,
  { type, payload }: { type: string, payload: any }
) => produce(state, draft => {
  switch (type) {
    case SET_USER: {
      draft.email = payload.email
      draft.id = payload.id
      draft.role = payload.role
      draft.avatar_url = payload.avatar_url

      break;
    }
    default: {
      break;
    }
  }
})

export default userStore