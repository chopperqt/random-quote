import Quote from "./Quote";
import QuoteSkeleton from "./quote-skeleton/QuoteSkeleton";
import { QuoteData } from 'services/quotes'
export interface IQuoteProps {
  loading?: boolean
  quote: QuoteData
}

export interface ILikesProps extends ILikesButtonProps {
  onClickLike: () => void
  onClickDislike: () => void
  loading: boolean
  count: number
}

export interface ILikesButtonProps {
  disableLike: boolean
  disableDislike: boolean
}

export {
  QuoteSkeleton
}

export default Quote