import { QuotesRequests } from 'models/quotes.type'
import { AuthorsRequests } from './authors'
import { AuthRequests } from './auth'
import { BookmarkRequests } from './bookmarks'
import { UploadRequest } from './upload'

export type ApiRequests =
  QuotesRequests |
  AuthorsRequests |
  AuthRequests |
  BookmarkRequests |
  UploadRequest

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

export interface GetQuotesSearch extends IGetQuotes {
  search?: string
}

export interface SearchQuotesProps extends IGetQuotes {
  search?: string
}

export interface QuotesBuild {
  from?: number
  to?: number
  id?: string
  authors?: number[]
  search?: string
  head?: boolean
  lastUpdates?: boolean
}