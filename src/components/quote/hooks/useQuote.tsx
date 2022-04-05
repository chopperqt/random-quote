import { IQuote } from 'services/quotes'
interface useQuote {
  quote: IQuote
}

const useQuote = ({
  quote,
}: useQuote) => {
  const hasQuote = Object.keys(quote).length !== 0

  const handleCopyText = () => {
    const { text } = quote

    navigator.clipboard.writeText(text)
  }

  return {
    hasQuote,
    handleCopyText,
  }
}

export default useQuote