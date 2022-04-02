import React from 'react'
import { PostgrestError } from '@supabase/supabase-js'

import { SuccessMessages } from './successMessages'
import Store, { notificationMethods } from 'services'

const loadingStatuses = (name: string) => {
  const handlePending = () => Store.dispatch(notificationMethods.loadingRequest(name, 'PENDING'))

  const handleFailure = ({ message }: PostgrestError) => {
    Store.dispatch(notificationMethods.loadingRequest(name, 'FAILURE'))

    notificationMethods.createNotification(message, 'ERROR')
  }
  const handleSuccess = (message?: string) => {
    Store.dispatch(notificationMethods.loadingRequest(name, 'SUCCESS'))

    if (message) {
      notificationMethods.createNotification(SuccessMessages.createSuccess, 'SUCCESS')
    }
  }


  return {
    handleFailure,
    handlePending,
    handleSuccess
  }
}

export default loadingStatuses
