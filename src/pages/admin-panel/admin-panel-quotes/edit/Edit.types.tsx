import { Option } from 'components/selector';
import { AuthorID } from 'models/author.type';
import { QuoteID } from 'models/quotes.type';

export interface EditProps {
  quote: string
  createdAt: Date,
  authorID: AuthorID
  quoteID: QuoteID
}

export type UseEditProps = Pick<EditProps, 'authorID'>

export interface EditFormFields {
  text: string
  author: Option
}