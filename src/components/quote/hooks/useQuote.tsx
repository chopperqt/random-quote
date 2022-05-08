import { useState } from 'react'

import { notificationMethods } from 'services'
import { SuccessMessages } from 'helpers/successMessages'

interface useQuoteProps {
  text: string
  id: number
}

const useQuote = ({
  text,
}: useQuoteProps) => {
  const { createNotification } = notificationMethods

  const handleCopyText = () => {
    navigator.clipboard.writeText(text)

    createNotification(SuccessMessages.copySuccess, 'SUCCESS')
  }

  return {
    handleCopyText,
  }
}

export default useQuote