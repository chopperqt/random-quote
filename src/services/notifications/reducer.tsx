import { NotificationType } from "components/notification/Notification"
import { actions } from "./actions"
import { RequestsData } from 'utils'
import produce from "immer"

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
  }) => produce(state, (draft: NotificationsStore) => {
    switch (type) {
      case CREATE_LOADING: {
        // TODO Отрефакторить
        // @ts-ignore
        draft.loading[payload.name] = payload.status

        break;
      }
      case CREATE_NOTIFICATION: {
        draft.notifications.push(payload)

        break;
      }
      case DELETE_NOTIFICATION: {
        draft.notifications = draft.notifications.filter(({ id }) => id !== payload)

        break
      }
      default: {
        break;
      }
    }
  })

export default notificationsStore