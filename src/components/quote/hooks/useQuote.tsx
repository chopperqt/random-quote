import { IQuote } from 'services/quotes'
interface useQuote {
  text: string
}

const useQuote = ({
  text,
}: useQuote) => {
  const handleCopyText = () => {
    navigator.clipboard.writeText(text)
  }

  return {
    handleCopyText,
  }
}

export default useQuote