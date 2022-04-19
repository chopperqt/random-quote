import { notificationMethods } from 'services'
import { SuccessMessages } from 'helpers/successMessages'

interface useQuoteProps {
  text: string
  id: number
}

interface IUseQuoteReturn {
  handleCopyText: () => void
}

const useQuote = ({
  text,
}: useQuoteProps): IUseQuoteReturn => {
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