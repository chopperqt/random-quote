import moment from 'moment'

import supabase from "./client";
import Store, { quoteMethods, notificationMethods } from 'services'
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
  TUpdateAction,
  IGetQuotes,
} from './'
import { IQuote } from 'services/quotes';
import { updateUrlParams } from 'helpers/urlParams';
import { serializeQuote } from 'helpers/serialize'

const LIMIT_PER_PAGE = 10

export const QuotesRequests = {
  getQuotes: 'getQuotes',
  getQuote: 'getQuote',
  getQuotesMore: 'getQuotesMore',
  getQuotesAuthor: 'getQuotesAuthor',
  getQuotesLast: 'getQuotesLast',
  searchQuote: 'searchQuote',
  changeRating: 'changeRating',
  postQuote: 'postQuotes',
  getLikedQuote: 'getLikedQuote',
  getActionQuote: 'getActionQuote',
}

export const getQuotes = async ({
  from = 1,
  to = 10,
  id
}: IGetQuotes) => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses(QuotesRequests.getQuotes)

  handlePending()

  const { count } = await supabase.from(Tables.quotes).select('*', { count: 'exact', head: true })

  const quotes = await supabase
    .from(Tables.quotes)
    .select(`*,
      author:id_author (
        name,
        path
      )
    `, {
      count: 'exact',
    })
    .range(from, to)

  let list: number[] = []

  if (quotes.error) {
    handleFailure(quotes.error)

    return
  }

  for (let quote of quotes!.data) {
    list.push(quote.id_quote)
  }

  let quotesData = quotes.data.map((item) => ({
    ...item,
    ...item.author
  }))


  if (id) {
    const bookmarks = await getBookmarks({ id_user: id, list })

    if (bookmarks.error) {
      return
    }

    quotesData = quotes.data.map((quote: IQuote) => {
      const isBookmark = bookmarks.data.find((item: any) => +item.id_quote === +quote.id_quote)

      return {
        ...quote,
        bookmarked: !!isBookmark,
        ...quote.author,
      }
    })
  }

  Store.dispatch(quoteMethods.getQuotes({
    data: quotesData,
    count: count,
  }))

  handleSuccess()
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

  const updateData = serializeQuote(data[0])

  Store.dispatch(quoteMethods.setQuote([updateData]))

  handleSuccess()
}

export const getRandomQuote = async (): Promise<boolean> => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses(QuotesRequests.getQuote)

  handlePending()

  let { data, error } = await supabase.rpc(SupabaseFunctions.getRandomQuote)

  if (error) {
    handleFailure(error)

    return true
  }

  Store.dispatch(quoteMethods.setQuote(data))

  handleSuccess()

  if (data && data[0].id_quote) {
    updateUrlParams({ qq: data[0].id_quote })
  }

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

  Store.dispatch(quoteMethods.getQuotes({ data, count }))

  handleSuccess()
}

export const getQuotesAuthors = async (id_author: string) => {
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
    .eq('id_author', +id_author);

  if (error) {
    handleFailure(error)

    return
  }

  handleSuccess()

  return data
}

export const getQuotesLast = async () => {
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

  Store.dispatch(quoteMethods.getLastQuotes({ data, count }))
}

export const searchQuote = debounce(async (search) => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses(QuotesRequests.searchQuote)

  // handlePending()

  const { data, error } = await supabase
    .from(Tables.quotes)
    .select(`
      *,
      author:id_author(
        path,
        name
      )
    `)
    .textSearch('text', `'${search}'`)

  if (error) {
    handleFailure(error)

    return
  }

  Store.dispatch(quoteMethods.quotesSearch(data))

  // handleSuccess()
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

export const changeRating = async ({
  id,
  id_user,
}: {
  id: number
  id_user: string
}, action: TUpdateAction) => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses(QuotesRequests.changeRating)

  handlePending()

  const currentLikes = await getCurrentQuoteRating({ id, id_user })
  const isNumberCurrentLikes = typeof currentLikes === 'number'

  if (!isNumberCurrentLikes) {
    handleFailure(currentLikes)
  }

  let rating = +currentLikes + 1

  if (action === 'dislike') {
    rating = +currentLikes - 1
  }

  const {
    data,
    error,
  } = await supabase
    .from(Tables.rating)
    .insert([{
      entity_id: id.toString(),
      entity_type: 'quote',
      id_user,
      count: rating,
      action,
    }])

  if (error) {
    handleFailure(error)

    return error
  }

  // Store.dispatch(quoteMethods.updateRandomQuote(data, id))

  handleSuccess()

  return data
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

export const getLikedQuote = async (id_quote: number, id_user: string) => {
  const {
    handleSuccess,
    handleFailure,
    handlePending,
  } = loadingStatuses(QuotesRequests.getLikedQuote)

  handlePending()

  const { data, error } = await supabase
    .from(Tables.rating)
    .select("*")
    .match({
      id_quote,
      id_user,
    })

  if (error) {
    handleFailure(error)
  }

  handleSuccess()

  return data
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

