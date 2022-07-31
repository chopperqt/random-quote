import { Author } from "./author.type"

export type QuotesRequests =
  'getQuotes' |
  'getQuote' |
  'getRandomQuote' |
  'getQuotesAuthor' |
  'getQuotesLast' |
  'searchQuote' |
  'postQuote' |
  'getFilterQuotesCount' |
  'updateQuote'

export interface QuotesApi {
  author: Author,
  created_at: Date,
  id_quote: QuoteID,
  id_author: AuthorID,
  text: string,
}

export type QuoteID = number
export type AuthorID = number
export type QuotesApiOptional = Partial<QuotesApi>