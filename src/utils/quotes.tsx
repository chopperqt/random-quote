import supabase from "./client";

import Store, { quoteMethods, notificationMethods } from 'services'
import { SuccessMessages } from 'helpers/successMessages'
import { generateRandomNumber } from 'helpers/random'
import {
  Tables
} from './constants'

const LIMIT_PER_PAGE = 20

export const getQuotes = async () => {
  Store.dispatch(notificationMethods.loadingRequest('getQuotes', 'PENDING'))

  let { data, error } = await supabase
    .from(Tables.quotes)
    .select(`
      *,
      author:id_author (name)
    `)
    .order("id_quote", { ascending: true })
    .limit(LIMIT_PER_PAGE);

  //      author:id_author (name)

  if (error) {
    const { message } = error

    Store.dispatch(notificationMethods.loadingRequest('getQuotes', 'FAILURE'))

    notificationMethods.createNotification(message, 'ERROR')
  }

  Store.dispatch(notificationMethods.loadingRequest('getQuotes', 'SUCCESS'))
  Store.dispatch(quoteMethods.getQuotes(data))
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

  let { data, error } = await supabase
    .from(Tables.quotes)
    .select(`
      *,
      author:id_author(
        name
      )
    `)
    .eq('id_quote', 1)
    .limit(1);

  if (error) {
    const { message } = error

    Store.dispatch(notificationMethods.loadingRequest('getRandomQuote', 'FAILURE'))

    notificationMethods.createNotification(message, 'ERROR')

    return
  }

  Store.dispatch(notificationMethods.loadingRequest('getRandomQuote', 'SUCCESS'))
  Store.dispatch(quoteMethods.getRandomQuote(data))
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

