import moment from 'moment'

import supabase from "./client";
import Store, { quoteMethods, notificationMethods } from 'services'
import { SuccessMessages } from 'helpers/successMessages'
import loadingStatuses from "helpers/loadingStatuses";
import {
  Tables,
} from './constants'
import debounce from 'lodash.debounce';

const LIMIT_PER_PAGE = 10

const QuotesRequests = {
  getQuotes: 'getQuotes',
  getQuotesMore: 'getQuotesMore',
  getQuotesAuthor: 'getQuotesAuthor',
  getQuotesLast: 'getQuotesLast',
  getRandomQuote: 'getRandomQuote',
  searchQuote: 'searchQuote',
}

export const getQuotes = async () => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses(QuotesRequests.getQuotes)

  handlePending()

  const { data, error, count } = await supabase
    .from(Tables.quotes)
    .select(`
      *,
      author:id_author (
        name,
        path
      )
    `, { count: 'exact' })
    .order("id_quote", { ascending: true })
    .limit(LIMIT_PER_PAGE)

  if (error) {
    handleFailure(error)

    return
  }

  handleSuccess()

  Store.dispatch(quoteMethods.getQuotes({ data, count }))
}
interface IGetQuotes {
  from?: number
  to?: number
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

  const { data, error, count } = await supabase
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

export const getRandomQuote = async () => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses(QuotesRequests.getRandomQuote)

  handlePending()

  let { data, error, } = await supabase
    .rpc('fuckyou3')

  if (error) {
    handleFailure(error)

    return
  }

  const modifyData = [
    {
      ...data?.[0],
      author: {
        name: data?.[0].name,
        path: data?.[0].path,
      }
    }
  ]

  Store.dispatch(quoteMethods.getRandomQuote(modifyData))

  handleSuccess()
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

interface IPostQuote {
  text: string
  time: string
  author: number
}

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


