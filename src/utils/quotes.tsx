import supabase from "./client";

import Store, { quoteMethods, notificationMethods } from 'services'
import { SuccessMessages } from 'helpers/successMessages'
import { generateRandomNumber } from 'helpers/random'
import {
  Tables
} from './constants'

export const getQuotes = async () => {
  let { data, error } = await supabase
    .from(Tables.quotes)
    .select('*')
    .order("id_quote", { ascending: true })

  if (error) console.log('error', error)

  return data
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
  let { data, error } = await supabase
    .from(Tables.quotes)
    .select(`
      *,
      author:authors(
        id_author,
        name
      )
    `)
    .eq('id_quote', generateRandomNumber(1, 6))
    .limit(1);

  if (error) {
    return console.log(error)
  }

  const modifyData = {
    ...data![0],
    author: {
      ...data![0].author[0]
    }
  }

  Store.dispatch(quoteMethods.getRandomQuote(modifyData))

  return modifyData
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

