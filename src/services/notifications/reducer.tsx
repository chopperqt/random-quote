import { NotificationType } from "components/notification/Notification"
import { actions } from "./actions"
import { ApiRequests } from 'utils'
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
  [key in ApiRequests]: StatusData
}

export interface Status {
  status: StatusTypes
  action: CountAction
}

export interface StatusData {
  status: StatusTypes
  count: number
}

interface CreateLoading {
  name: ApiRequests
  status: Status
}

export type CountAction = 'INCREASE' | 'DECREASE'

export type StatusTypes = 'PENDING' | 'SUCCESS' | 'FAILURE' | undefined

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
        const { name, status } = payload as CreateLoading
        let count = draft.loading[name]?.count || 0

        if (status.action === 'INCREASE') {
          count++
        }

        if (status.action === 'DECREASE') {
          count--
        }

        draft.loading[name] = {
          status: status.status,
          count,
        }

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