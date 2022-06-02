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
import {
  PostgrestError,
} from '@supabase/supabase-js';
import { getBookmarks } from './bookmarks'
import {
  IPostQuote,
  IGetQuotes,
  SearchQuotesProps,
  GetQuotesSearch,
  QuotesBuild,
} from './'
import { Quote, QuoteData } from 'services/quotes';
import { serializeQuote } from 'helpers/serialize'
import DefaultProps from 'helpers/defaultProps';

const LIMIT_PER_PAGE = 10
const QUERY_QUOTES = '*, author: id_author (name, path)'

export const QuotesRequests = {
  getQuotes: 'getQuotes',
  getQuote: 'getQuote',
  getRandomQuote: 'getRandomQuote',
  getQuotesAuthor: 'getQuotesAuthor',
  getQuotesLast: 'getQuotesLast',
  searchQuote: 'searchQuote',
  postQuote: 'postQuotes',
  getFilterQuotesCounter: 'getFilterQuotesCounter',
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

export const getQuote = async (id: number, idUser?: string) => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses('getQuote')

  handlePending()

  const { data, error } = await supabase
    .from(Tables.quotes)
    .select(`
    *,
    author:id_author (
      name,
      path
    ) 
  `)
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

    updateData = updateData.map((quote: QuoteData) => {
      const isBookmark = bookmarks.data.find((item: QuoteData) => +item.id_quote === +quote.id_quote)

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
  } = loadingStatuses(QuotesRequests.getQuotes)

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
    count: count,
  }))

  handleSuccess()
}

export const getRandomQuote = async (idUser?: string): Promise<boolean | PostgrestError> => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses(QuotesRequests.getQuote)

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
  } = loadingStatuses(QuotesRequests.getQuotesAuthor)

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
  } = loadingStatuses(QuotesRequests.getQuotesLast)

  handlePending()

  const { data, error, count } = await createQuotesBuilder({ lastUpdates: true })

  if (error) {
    handleFailure(error)

    return
  }

  Store.dispatch(quoteMethods.setLastQuotes({ data, count }))

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
  } = loadingStatuses(QuotesRequests.searchQuote)

  handlePending()

  const response = await createQuotesBuilder({
    search,
    authors,
    from,
    to,
  })

  const { data, error, count } = response

  if (error) {
    handleFailure(error)

    return
  }

  Store.dispatch(quoteMethods.quotesSearch({ data, count }))

  handleSuccess()
}, 800)

export const postQuote = async ({
  text,
  time,
  author,
}: IPostQuote) => {
  const {
    handlePending,
    handleSuccess,
    handleFailure,
  } = loadingStatuses(QuotesRequests.postQuote)

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
  } = loadingStatuses(QuotesRequests.getFilterQuotesCounter)

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