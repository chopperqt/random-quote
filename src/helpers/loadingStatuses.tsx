import { ApiError, PostgrestError } from '@supabase/supabase-js'

import { SuccessMessages } from './successMessages'
import Store, { notificationMethods } from 'services'
import { RequestsData } from 'utils'
import { CountAction, StatusTypes } from 'services/notifications/reducer'

export type TLoadingStatus = (() => void) | ((message?: PostgrestError) => void)

interface Action {
  pending: ActionData
  failure: ActionData
  success: ActionData
}

interface ActionData {
  action: CountAction
  status: StatusTypes
}

export const ActionsStatus: Action = {
  pending: {
    action: 'INCREASE',
    status: 'PENDING',
  },
  failure: {
    action: 'DECREASE',
    status: 'FAILURE',
  },
  success: {
    action: 'DECREASE',
    status: 'SUCCESS'
  }
}

const loadingStatuses = (name: RequestsData | string) => {
  const handlePending = () => Store.dispatch(notificationMethods.loadingRequest(name, ActionsStatus.pending))

  const handleFailure = ({ message }: PostgrestError | ApiError) => {
    Store.dispatch(notificationMethods.loadingRequest(name, ActionsStatus.failure))

    notificationMethods.createNotification(message, 'ERROR')
  }

  const handleSuccess = (message?: string) => {
    Store.dispatch(notificationMethods.loadingRequest(name, ActionsStatus.success))

    if (message) {
      notificationMethods.createNotification(message || SuccessMessages.createSuccess, 'SUCCESS')
    }
  }

  return {
    handleFailure,
    handlePending,
    handleSuccess
  }
}

export default loadingStatuses
