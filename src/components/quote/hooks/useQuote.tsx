import { useEffect, useState } from 'react'
import useResponse from 'helpers/useResponse'
import { Stores } from 'services'
import useUser from 'helpers/useUser'

interface useQuoteProps {
  text: string
  id: number
}

const useQuote = ({
  text,
  id,
}: useQuoteProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { NotificationStore } = Stores()
  const {
    loading,
  } = NotificationStore

  const loadingUpdateQuotesLike = useResponse({
    loading: loading.changeRating,
  })

  const handleCopyText = () => {
    navigator.clipboard.writeText(text)
  }

  useEffect(() => {
    // checkDisabledLikes()
  }, [])

  return {
    handleCopyText,
    loadingUpdateQuotesLike,
    isLoadingLike: isLoading,
  }
}

export default useQuote