import { ApiError, PostgrestError } from '@supabase/supabase-js'

import { SuccessMessages } from './successMessages'
import Store, { notificationMethods } from 'services'
import { ApiRequests } from 'utils'
import { CountAction, StatusTypes } from 'services/notifications/reducer'

export type TLoadingStatus = (() => void) | ((message?: PostgrestError) => void)

type ErrorType = PostgrestError | ApiError | Error

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

const loadingStatuses = (requestName: ApiRequests) => {
  const handlePending = () => {
    Store.dispatch(notificationMethods.loadingRequest(requestName, ActionsStatus.pending, true, false))
  }

  const handleFailure = (message?: string) => {
    Store.dispatch(notificationMethods.loadingRequest(requestName, ActionsStatus.failure, false, true, message))

    if (!message) {
      return
    }

    notificationMethods.createNotification(message, 'ERROR')
  }

  const handleSuccess = (message?: string) => {
    Store.dispatch(notificationMethods.loadingRequest(requestName, ActionsStatus.success, false))

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
