import moment from 'moment'
import { produce } from 'immer'

import supabase from "./client";
import Store, {
  quoteMethods,
  notificationMethods,
  filterMethods,
} from 'services'
import { SuccessMessages } from 'helpers/successMessages'
import loadingStatuses from "helpers/loadingStatuses";
import {
  Tables,
  SupabaseFunctions,
} from './constants'
import debounce from 'lodash.debounce';
import { PostgrestError } from '@supabase/supabase-js';
import { getBookmarks } from './bookmarks'
import {
  IPostQuote,
  IGetQuotes,
  SearchQuotesProps,
  GetQuotesSearch,
  QuotesBuild,
} from './'
import { QuoteData } from 'services/quotes/QuotesStore';
import { serializeQuote, serializeQuoteReturn } from 'helpers/serialize'
import DefaultProps from 'helpers/defaultProps';
import { UserID } from './auth';

const LIMIT_PER_PAGE = 10
const QUERY_QUOTES = '*, author: id_author (name, path)'
const DELAY = 800

export type QuotesRequests =
  'getQuotes' |
  'getQuote' |
  'getRandomQuote' |
  'getQuotesAuthor' |
  'getQuotesLast' |
  'searchQuote' |
  'postQuote' |
  'getFilterQuotesCount'

export interface QuotesApi {
  author: {
    path: string,
    name: string
  },
  created_at: Date,
  data: Date,
  id_quote: number,
  id_author: number,
  text: string,
}

const createQuotesBuilder = ({
  search,
  from = 0,
  to = 10,
  authors = DefaultProps.array,
  head = false,
  lastUpdates = false,
}: QuotesBuild) => {
  let request = supabase.from(Tables.quotes).select(QUERY_QUOTES, { count: 'exact', head })

  if (lastUpdates) {
    return request.gt("created_at", moment().startOf('day').toISOString())
  }

  if (authors.length) {
    request = request.in('id_author', authors)
  }

  if (search) {
    request = request.textSearch('text', search)
  }

  request = request.range(from, to)

  return request
}

export const getQuote = async (id: number, idUser?: UserID) => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses('getQuote')

  handlePending()

  const { data, error } = await supabase
    .from(Tables.quotes)
    .select(QUERY_QUOTES)
    .match({ id_quote: id })

  if (error) {
    handleFailure(error)

    return
  }

  let updateData = [serializeQuote(data[0])]

  if (idUser) {
    const bookmarks = await getBookmarks({ id_user: idUser, list: [data[0].id_quote] })

    if (bookmarks.error) {
      return
    }

    updateData = updateData.map((quote: serializeQuoteReturn) => {
      const isBookmark = bookmarks.data.find((item: serializeQuoteReturn) => +item.id_quote === +quote.id_quote)

      return {
        ...quote,
        bookmarked: !!isBookmark,
      }
    })
  }

  Store.dispatch(quoteMethods.setQuote(updateData))

  handleSuccess()
}

export const getQuotes = async ({
  from = 1,
  to = 10,
  id,
  authors = DefaultProps.array,
}: IGetQuotes) => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses('getQuotes')

  handlePending()

  const {
    data,
    error,
    count,
  } = await createQuotesBuilder({ from, to, authors })

  if (error) {
    handleFailure(error)

    return
  }

  const updateData = produce(data as QuoteData[], async (draft) => {
    const list = []

    for (let quote of data) {
      if (quote.id_quote) {
        list.push(quote.id_quote.toString())
      }
    }

    draft = draft.map((item: QuoteData) => ({
      ...item,
      ...item.author
    }))

    if (id) {
      const bookmarks = await getBookmarks({ id_user: id, list })

      if (bookmarks.error) {
        return draft
      }

      draft = draft.map((item: QuoteData) => {
        const isBookmark = bookmarks.data.find(marked => +item.id_quote === +marked.id_quote)

        return {
          ...item,
          bookmarked: !!isBookmark,
        }

      })
    }

    return draft
  })

  Store.dispatch(quoteMethods.setAllQuotes({
    data: await updateData,
    count: count || 0,
  }))

  handleSuccess()
}

export const getRandomQuote = async (idUser?: UserID): Promise<boolean | PostgrestError> => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses('getQuote')

  handlePending()

  const { data, error } = await supabase.rpc(SupabaseFunctions.getRandomQuote)

  if (error) {
    handleFailure(error)

    return error
  }

  let updateData = [serializeQuote(data[0])]

  if (idUser) {
    const bookmarks = await getBookmarks({ id_user: idUser, list: [data[0].id_quote] })

    if (bookmarks.error) {
      handleFailure(bookmarks.error)

      return bookmarks.error
    }

    updateData = data.map((quote: QuoteData) => {
      const isBookmark = bookmarks.data.find((item: QuoteData) => +item.id_quote === +quote.id_quote)


      return {
        ...quote,
        bookmarked: !!isBookmark,
      }
    })
  }

  Store.dispatch(quoteMethods.setQuote(updateData))

  handleSuccess()

  return true
}

export const getQuotesAuthors = async (authors: string[]) => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses('getQuotesAuthor')

  handlePending()

  let { data, error } = await supabase
    .from(Tables.authorsQuotes)
    .select(`
      id,
      data:quotes(
        id_quote,
        text
      )
    `)
    .in('id_author', authors);

  if (error) {
    handleFailure(error)

    return
  }

  handleSuccess()

  return data
}

export const getLastQuotes = async () => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses('getQuotesLast')

  handlePending()

  const { data, error, count } = await createQuotesBuilder({ lastUpdates: true })

  if (error) {
    handleFailure(error)

    return
  }

  Store.dispatch(quoteMethods.setLastQuotes({
    data,
    count: count || 0,
  }))

  handleSuccess()
}

export const searchQuote = debounce(async ({
  id,
  authors,
  from,
  to,
  search = '',
}: SearchQuotesProps) => {
  const {
    handlePending,
    handleSuccess,
    handleFailure,
  } = loadingStatuses('searchQuote')

  handlePending()

  const response = await createQuotesBuilder({
    search,
    authors,
    from,
    to,
  })

  const {
    data,
    error,
    count,
  } = response

  if (error) {
    handleFailure(error)

    return
  }

  Store.dispatch(quoteMethods.quotesSearch({
    data,
    count: count || 0
  }))

  handleSuccess()
}, DELAY)

export const postQuote = async ({
  text,
  time,
  author,
}: IPostQuote) => {
  const {
    handlePending,
    handleSuccess,
    handleFailure,
  } = loadingStatuses('postQuote')

  handlePending()

  let createQuote = await supabase
    .from(Tables.quotes)
    .insert({ text, data: time })
    .single();

  if (createQuote.error) {
    const { message } = createQuote.error

    handleFailure(createQuote.error)

    notificationMethods.createNotification(message, 'ERROR')

    return
  }

  if (createQuote.data) {
    const createAuthorQuotes = await supabase
      .from(Tables.authorsQuotes)
      .insert({
        id_author: author,
        id_quote: createQuote.data.id_quote,
      })
      .single();

    if (createAuthorQuotes.error) {
      const { message } = createAuthorQuotes.error

      handleFailure(createAuthorQuotes.error)

      notificationMethods.createNotification(message, 'ERROR')

      return
    }

    handleSuccess()

    notificationMethods.createNotification(SuccessMessages.createSuccess, 'SUCCESS')

    return {
      multiLine: createAuthorQuotes.data,
      quote: createQuote.data
    }
  }
}

export const getFilterQuotesCounter = async (data: GetQuotesSearch) => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses('getFilterQuotesCount')

  handlePending()

  let response = await createQuotesBuilder(data)

  const { count, error } = response

  if (error) {
    handleFailure(error)

    return
  }

  Store.dispatch(filterMethods.updateFiltersCount(count || 0))

  handleSuccess()
}