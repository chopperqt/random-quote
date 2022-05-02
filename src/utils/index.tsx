import { QuotesRequests } from './quotes'
import { AuthorsRequests } from './authors'

const Requests = {
  ...QuotesRequests,
  ...AuthorsRequests,
}

export type TQuotesRequest = keyof typeof QuotesRequests
export type TAuthorsRequests = keyof typeof AuthorsRequests
export type RequestsData = keyof typeof Requests

export interface IPostQuote {
  text: string
  time: string
  author: number
}

export type TUpdateAction = 'like' | 'dislike'

export interface IGetQuotes {
  from?: number
  to?: number
  id?: string
}

export {
  Requests
}