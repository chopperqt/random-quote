import { NotificationType } from "components/notification/Notification"
import { actions } from "./actions"
import { RequestsData } from 'utils'

const initialState: NotificationsStore = {
  notifications: [],
  loading: {} as LoadingData,
}

const {
  CREATE_NOTIFICATION,
  DELETE_NOTIFICATION,
  CREATE_LOADING,
} = actions

export interface NotificationsStore {
  notifications: NotificationData[]
  loading: LoadingData
}

export interface NotificationData {
  text: string
  id: string
  type: NotificationType
}

type LoadingData = {
  [key in RequestsData]: StatusData
}

export type StatusData = 'PENDING' | 'SUCCESS' | 'FAILURE' | undefined

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