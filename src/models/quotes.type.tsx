import { AuthorApi } from "./author.type"
import { AuthorID } from "./author.type"

export type QuotesRequests =
  'getQuotes' |
  'getQuote' |
  'getRandomQuote' |
  'getQuotesAuthor' |
  'getQuotesLast' |
  'searchQuote' |
  'postQuote' |
  'getFilterQuotesCount' |
  'updateQuote' |
  'deleteQuote'

type QuoteAuthor = Pick<AuthorApi, 'path' | 'name'>

export interface QuotesApi {
  author: QuoteAuthor,
  created_at: Date,
  id_quote: number,
  id_author: AuthorID,
  text: string,
}

export type QuoteID = QuotesApi['id_quote']
export type QuotesApiOptional = Partial<QuotesApi>