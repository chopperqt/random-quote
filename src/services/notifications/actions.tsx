import Store from 'services'
import { v4 as uuid } from 'uuid'

import { NotificationData, StatusData } from './reducer'
import { NotificationType } from "components/notification/Notification"

const DELAY_AFTER_DELETE = 3000

export const actions = {
  CREATE_NOTIFICATION: 'CREATE_NOTIFICATION',
  DELETE_NOTIFICATION: 'DELETE_NOTIFICATION',
  CREATE_LOADING: 'LOADING'
}

export const methods = {
  loadingRequest: (name: string, status: StatusData) => {
    return {
      type: actions.CREATE_LOADING,
      payload: {
        name,
        status,
      }
    }
  },
  addNotification: ({ text, type, id }: NotificationData) => {
    return {
      type: actions.CREATE_NOTIFICATION,
      payload: {
        text,
        id,
        type,
      }
    }
  },
  deleteNotification: (id: string) => {
    return {
      type: actions.DELETE_NOTIFICATION,
      payload: id,
    }
  },
  createNotification,

}

function createNotification(text: string, type: NotificationType) {
  const id = uuid()

  Store.dispatch(methods.addNotification({
    text,
    type,
    id,
  }))

  setTimeout(() => {
    Store.dispatch(methods.deleteNotification(id))
  }, DELAY_AFTER_DELETE)
}