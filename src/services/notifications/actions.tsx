import Store from 'services'
import { v4 as uuid } from 'uuid'

import { INotification } from './reducer'
import { TNotification } from "components/notification/Notification"

const DELAY_AFTER_DELETE = 3000

export const actions = {
  CREATE_NOTIFICATION: 'CREATE_NOTIFICATION',
  DELETE_NOTIFICATION: 'DELETE_NOTIFICATION',
}

export const methods = {
  addNotification: ({ text, type, id }: INotification) => {
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

function createNotification(text: string, type: TNotification) {
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