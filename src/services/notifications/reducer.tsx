import { TNotification } from "components/notification/Notification"
import { actions } from "./actions"
import { TRequests, Requests } from 'utils'

const initialState: INotificationsStore = {
  notifications: [],
  loading: {} as any
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

type ILoading = {
  [key in TRequests]: TLoading
}

export type TLoading = 'PENDING' | 'SUCCESS' | 'FAILURE' | undefined

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
        notifications: state.notifications.filter(({ id }) => id !== payload)
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