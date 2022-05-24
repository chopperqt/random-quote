import moment from 'moment'

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
  PostgrestResponse,
} from '@supabase/supabase-js';
import { getBookmarks } from './bookmarks'
import {
  IPostQuote,
  IGetQuotes,
  SearchQuotesProps,
} from './'
import { QuoteData } from 'services/quotes';
import { serializeQuote } from 'helpers/serialize'
import DefaultProps from 'helpers/defaultProps';

const LIMIT_PER_PAGE = 10
const QUERY_QUOTES = '*, author: id_author (name, path)'

export const QuotesRequests = {
  getQuotes: 'getQuotes',
  getQuote: 'getQuote',
  getRandomQuote: 'getRandomQuote',
  getQuotesMore: 'getQuotesMore',
  getQuotesAuthor: 'getQuotesAuthor',
  getQuotesLast: 'getQuotesLast',
  searchQuote: 'searchQuote',
  postQuote: 'postQuotes',
  getActionQuote: 'getActionQuote',
  getFilterQuotes: 'getFilterQuotes',
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

  let response: PostgrestResponse<any>;

  if (authors.length) {
    response = await supabase.from(Tables.quotes).select(QUERY_QUOTES, { count: 'exact' }).in('id_author', authors).range(from, to)
  } else {
    response = await supabase.from(Tables.quotes).select(QUERY_QUOTES, { count: 'exact' }).range(from, to)
  }

  const { data, error, count } = response

  let list: number[] = []

  if (error) {
    handleFailure(error)

    return
  }

  for (let quote of data) {
    list.push(quote.id_quote)
  }

  let quotesData = data!.map((item) => ({
    ...item,
    ...item.author
  }))

  if (id) {
    const bookmarks = await getBookmarks({ id_user: id, list })

    if (bookmarks.error) {
      return
    }

    quotesData = data!.map((quote: QuoteData) => {
      const isBookmark = bookmarks.data.find((item: any) => +item.id_quote === +quote.id_quote)

      return {
        ...quote,
        bookmarked: !!isBookmark,
        ...quote.author,
      }
    })
  }

  Store.dispatch(quoteMethods.setAllQuotes({
    data: quotesData,
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

export const getQuotesMore = async ({
  from = 0,
  to = LIMIT_PER_PAGE
}: IGetQuotes) => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses(QuotesRequests.getQuotesMore)

  handlePending()

  const {
    data,
    error,
    count
  } = await supabase
    .from(Tables.quotes)
    .select(`
      *,
      author:id_author (
        name,
        path
      )
    `, { count: 'exact' })
    .order("id_quote", { ascending: true })
    .range(from, to)
    .limit(LIMIT_PER_PAGE)

  if (error) {
    handleFailure(error)

    return
  }

  Store.dispatch(quoteMethods.setAllQuotes({ data, count }))

  handleSuccess()
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

  const { data, error, count } = await supabase
    .from(Tables.quotes)
    .select(`
    *,
    author:id_author(
      path,
      name
    )
  `, { count: 'exact' })
    .gt("created_at", moment().startOf('day').toISOString());

  if (error) {
    handleFailure(error)

    return
  }

  handleSuccess()

  Store.dispatch(quoteMethods.setLastQuotes({ data, count }))
}

export const searchQuote = debounce(async ({
  id,
  authors,
  from,
  to,
  search,
}: SearchQuotesProps) => {
  const {
    handlePending,
    handleSuccess,
    handleFailure,
  } = loadingStatuses(QuotesRequests.searchQuote)

  handlePending()

  const { data, error } = await supabase
    .from(Tables.quotes)
    .select(QUERY_QUOTES)
    .textSearch('text', `'${search}'`)

  if (error) {
    handleFailure(error)

    return
  }

  Store.dispatch(quoteMethods.quotesSearch(data))

  handleSuccess()
}, 800)

export const postQuote = async ({
  text,
  time,
  author,
}: IPostQuote) => {
  Store.dispatch(notificationMethods.loadingRequest('postQuote', 'PENDING'))

  let createQuote = await supabase
    .from(Tables.quotes)
    .insert({ text, data: time })
    .single();

  if (createQuote.error) {
    const { message } = createQuote.error

    Store.dispatch(notificationMethods.loadingRequest('postQuote', 'FAILURE'))

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

      Store.dispatch(notificationMethods.loadingRequest('postQuote', 'FAILURE'))

      notificationMethods.createNotification(message, 'ERROR')

      return
    }

    Store.dispatch(notificationMethods.loadingRequest('postQuote', 'SUCCESS'))

    notificationMethods.createNotification(SuccessMessages.createSuccess, 'SUCCESS')

    return {
      multiLine: createAuthorQuotes.data,
      quote: createQuote.data
    }
  }
}

export const getCurrentQuoteRating = async ({
  id,
  id_user,
}: {
  id: number
  id_user: string
}): Promise<PostgrestError | number> => {
  const {
    data,
    error
  } = await supabase
    .from(Tables.rating)
    .select('*')
    .match({
      entity_id: id.toString(),
      entity_type: 'quote',
    })

  if (error) {
    return error
  }

  return data[0]?.rating || 0
}

export const getActionQuote = async (
  id: string,
  list: number[],
  limit: number = LIMIT_PER_PAGE
): Promise<any[]> => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses(QuotesRequests.getActionQuote)

  handlePending()

  const { data, error } = await supabase.rpc('getquotes5', {
    id,
    list: "{25}",
  })

  if (error) {
    handleFailure(error)

    return []
  }

  handleSuccess()

  return data || []
}

export const getFilterQuotes = async ({
  from = 1,
  to = 10,
  authors = DefaultProps.array,
}: IGetQuotes) => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses(QuotesRequests.getFilterQuotes)

  handlePending()

  let response: PostgrestResponse<any>;

  if (authors.length) {
    response = await supabase.from(Tables.quotes).select(QUERY_QUOTES, { count: 'exact', head: false }).in('id_author', authors).range(from, to)
  } else {
    response = await supabase.from(Tables.quotes).select(QUERY_QUOTES, { count: 'exact', head: false }).range(from, to)
  }

  const { count, error } = response

  if (error) {
    handleFailure(error)

    return
  }

  const formattedCounter = count || 0

  Store.dispatch(filterMethods.updateFiltersCount(formattedCounter))

  handleSuccess()
}