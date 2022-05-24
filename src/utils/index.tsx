import { QuotesRequests } from './quotes'
import { AuthorsRequests } from './authors'
import { AuthRequests } from './auth'

const Requests = {
  ...QuotesRequests,
  ...AuthorsRequests,
  ...AuthRequests,
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
  authors?: number[]
}

export interface SearchQuotesProps extends IGetQuotes {
  search?: string
}

export {
  Requests
}