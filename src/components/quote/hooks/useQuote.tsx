import { useEffect, useState } from 'react'
import useResponse from 'helpers/useResponse'
import { Stores } from 'services'
import {
  changeRating,
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
    loading: loading.changeRating,
  })

  const handleCopyText = () => {
    navigator.clipboard.writeText(text)
  }

  const raiseRating = async () => {
    if (!user) {
      return
    }

    setIsLoading(true)

    const isLiked = await changeRating({ id, id_user: user.id }, 'like')

    if (isLiked) {
      setIsLoading(false)

      return
    }

    setIsLoading(false)
  }

  const lowerRating = async () => {

  }

  useEffect(() => {
    // checkDisabledLikes()
  }, [])

  return {
    handleCopyText,
    loadingUpdateQuotesLike,
    isLoadingLike: isLoading,
    raiseRating,
    lowerRating,
    disableLike,
    disableDislike,
  }
}

export default useQuote