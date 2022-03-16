import supabase from "./client";

import Store, { quoteMethods } from 'services'
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

export const postQuote = async (text: string, time: string, author: number) => {
  let createQuote = await supabase
    .from(Tables.quotes)
    .insert({ text, data: time })
    .single();

  if (createQuote.error) {
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
      return createAuthorQuotes.error
    }

    return {
      multiLine: createAuthorQuotes.data,
      quote: createQuote.data
    }
  }
}

