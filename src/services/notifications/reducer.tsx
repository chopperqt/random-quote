import { TNotification } from "components/notification/Notification"
import { actions } from "./actions"

const initialState: INotificationsStore = {
  notifications: [],
  loading: {}
}

const {
  CREATE_NOTIFICATION,
  DELETE_NOTIFICATION,
  CREATE_LOADING,
} = actions

export interface INotificationsStore {
  notifications: INotification[]
  loading: ILoading
}

export interface INotification {
  text: string
  id: string
  type: TNotification
}

interface ILoading {
  [key: string]: TLoading
}

export type TLoading = 'PENDING' | 'SUCCESS' | 'FAILURE'

const notificationsStore = (
  state = initialState,
  {
    type,
    payload,
  }: {
    type: string,
    payload: any
  }) => {
  switch (type) {
    case CREATE_LOADING: {
      return {
        ...state,
        loading: {
          ...state.loading,
          [payload.name]: payload.status
        }
      }
    }
    case CREATE_NOTIFICATION: {
      return {
        ...state,
        notifications: [
          ...state.notifications,
          { ...payload }
        ]
      }
    }
    case DELETE_NOTIFICATION: {
      return {
        ...state,
        notification: state.notifications.filter(({ id }) => id !== payload)
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default notificationsStore