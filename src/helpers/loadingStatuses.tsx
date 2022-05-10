import { ApiError, PostgrestError } from '@supabase/supabase-js'

import { SuccessMessages } from './successMessages'
import Store, { notificationMethods } from 'services'
import { RequestsData } from 'utils'

export type TLoadingStatus = (() => void) | ((message?: PostgrestError) => void)

const loadingStatuses = (name: RequestsData | string) => {
  const handlePending = () => Store.dispatch(notificationMethods.loadingRequest(name, 'PENDING'))

  const handleFailure = ({ message }: PostgrestError | ApiError) => {
    Store.dispatch(notificationMethods.loadingRequest(name, 'FAILURE'))

    notificationMethods.createNotification(message, 'ERROR')
  }

  const handleSuccess = (message?: string) => {
    Store.dispatch(notificationMethods.loadingRequest(name, 'SUCCESS'))

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
