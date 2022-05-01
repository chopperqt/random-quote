import { UserStore } from "./reducer"

export const actions = {
  SET_USER: 'SET_USER'
}

export const methods = {
  setUser(data: UserStore) {
    return {
      type: actions.SET_USER,
      payload: data
    }
  }
}