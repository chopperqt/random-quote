import Quote from "./Quote";
import QuoteSkeleton from "./quote-skeleton/QuoteSkeleton";
import { IQuote } from 'services/quotes'
export interface IQuoteProps {
  loading?: boolean
  quote: IQuote
}

export interface ILikesProps {
  onClickLike: () => void
  onClickDislike: () => void
  loading: boolean
  count: number
}

export {
  QuoteSkeleton
}

export default Quote