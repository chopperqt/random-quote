import { useState } from 'react'
import useResponse from 'helpers/useResponse'
import { Stores } from 'services'
import { updateQuoteLikes } from 'utils/quotes'

interface useQuote {
  text: string
  id: number
}

const useQuote = ({
  text,
  id,
}: useQuote) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { NotificationStore } = Stores()
  const {
    loading,
  } = NotificationStore

  const loadingUpdateQuotesLike = useResponse({
    loading: loading.updateQuoteLikes,
  })

  const handleCopyText = () => {
    navigator.clipboard.writeText(text)
  }

  const handleClickLike = async () => {
    setIsLoading(true)

    const isLiked = await updateQuoteLikes({ id }, 'like')

    if (isLiked) {
      setIsLoading(false)

      return
    }

    setIsLoading(false)
  }

  const handleClickDislike = async () => {
    setIsLoading(true)

    const isLiked = await updateQuoteLikes({ id }, 'dislike')

    if (isLiked) {
      setIsLoading(false)

      return
    }

    setIsLoading(false)
  }

  return {
    handleCopyText,
    loadingUpdateQuotesLike,
    isLoadingLike: isLoading,
    handleClickLike,
    handleClickDislike,
  }
}

export default useQuote