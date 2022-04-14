import useResponse from 'helpers/useResponse'
import { Stores } from 'services'
interface useQuote {
  text: string
}

const useQuote = ({
  text,
}: useQuote) => {
  const { NotificationStore } = Stores()
  const {
    loading: {
      updateQuoteLikes,
    }
  } = NotificationStore

  const loadingUpdateQuotesLike = useResponse({
    loading: updateQuoteLikes,
  })

  const handleCopyText = () => {
    navigator.clipboard.writeText(text)
  }

  return {
    handleCopyText,
    loadingUpdateQuotesLike,
  }
}

export default useQuote