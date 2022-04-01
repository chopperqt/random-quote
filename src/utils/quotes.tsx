import supabase from "./client";

import Store, { quoteMethods, notificationMethods } from 'services'
import { SuccessMessages } from 'helpers/successMessages'
import moment from 'moment'
import {
  Tables
} from './constants'

const LIMIT_PER_PAGE = 10

export const getQuotes = async () => {
  Store.dispatch(notificationMethods.loadingRequest('getQuotes', 'PENDING'))

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
    .limit(LIMIT_PER_PAGE);

  if (error) {
    const { message } = error

    Store.dispatch(notificationMethods.loadingRequest('getQuotes', 'FAILURE'))

    notificationMethods.createNotification(message, 'ERROR')
  }

  Store.dispatch(notificationMethods.loadingRequest('getQuotes', 'SUCCESS'))
  Store.dispatch(quoteMethods.getQuotes({ data, count }))
}

export const getAuthorQuotes = async (id_author: string) => {
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

  if (error) console.log('error', error)

  return data
}

export const getRandomQuote = async () => {
  Store.dispatch(notificationMethods.loadingRequest('getRandomQuote', 'PENDING'))

  let { data, error, } = await supabase
    .rpc('fuckyou3')


  if (error) {
    const { message } = error

    Store.dispatch(notificationMethods.loadingRequest('getRandomQuote', 'FAILURE'))

    notificationMethods.createNotification(message, 'ERROR')

    return
  }

  Store.dispatch(notificationMethods.loadingRequest('getRandomQuote', 'SUCCESS'))

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
}

export const getLastQuotes = async () => {
  Store.dispatch(notificationMethods.loadingRequest('getLastQuotes', 'PENDING'))

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
    const { message } = error

    Store.dispatch(notificationMethods.loadingRequest('getLastQuotes', 'FAILURE'))

    notificationMethods.createNotification(message, 'ERROR')
  }

  Store.dispatch(notificationMethods.loadingRequest('getLastQuotes', 'SUCCESS'))
  Store.dispatch(quoteMethods.getLastQuotes({ data, count }))
}

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

