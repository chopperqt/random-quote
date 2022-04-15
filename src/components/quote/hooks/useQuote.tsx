import { useEffect, useMemo, useState } from 'react'
import useResponse from 'helpers/useResponse'
import { Stores } from 'services'
import {
  updateQuoteLikes,
  getLikedQuote
} from 'utils/quotes'
import useUser from 'helpers/useUser'

interface useQuote {
  text: string
  id: number
}

const useQuote = ({
  text,
  id,
}: useQuote) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [disableLike, setDisabledLike] = useState<boolean>(false)
  const [disableDislike, setDisableDislike] = useState<boolean>(false)
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
    setIsLoading(true)

    const isLiked = await updateQuoteLikes({ id }, 'dislike')

    if (isLiked) {
      setIsLoading(false)

      return
    }

    setIsLoading(false)
  }

  const checkDisabledLikes = async () => {
    if (user && id) {
      const data = await getLikedQuote(id, user.id)

      if (data) {
        const isDisabledLike = data[0].action === 'like'

        setDisabledLike(isDisabledLike)
      }
    }
  }

  useEffect(() => {
    checkDisabledLikes()
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