import { useEffect, useState } from 'react'
import useResponse from 'helpers/useResponse'
import { Stores } from 'services'
import {
  updateQuoteLikes,
} from 'utils/quotes'
import useUser from 'helpers/useUser'
import { TQuoteAction } from 'services/quotes'

interface useQuoteProps {
  text: string
  id: number
  action: TQuoteAction | undefined
}

const useQuote = ({
  text,
  id,
  action,
}: useQuoteProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [disableLike, setDisabledLike] = useState<boolean>(action === 'like' || false)
  const [disableDislike, setDisableDislike] = useState<boolean>(action === 'dislike' || false)
  const { NotificationStore } = Stores()
  const {
    loading,
  } = NotificationStore
  const { user } = useUser()

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

  }

  const checkDisabledLikes = async () => {

  }

  useEffect(() => {
    // checkDisabledLikes()
  }, [])

  return {
    handleCopyText,
    loadingUpdateQuotesLike,
    isLoadingLike: isLoading,
    handleClickLike,
    handleClickDislike,
    disableLike,
    disableDislike,
  }
}

export default useQuote