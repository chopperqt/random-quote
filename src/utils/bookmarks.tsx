import { PostgrestError } from "@supabase/supabase-js";

import loadingStatuses from "helpers/loadingStatuses";
import Store, { quoteMethods } from "services";
import supabase from "./client";
import { Tables } from "./constants";
import { QuoteData } from "services/quotes/QuotesStore";
import { QuoteID } from "models/quotes.type";

export type BookmarkRequests =
  'addBookmark' |
  'removeBookmark' |
  'getBookmarks' |
  'deleteBookmarks'


type BookmarksQuote = Pick<QuoteData, 'id_quote'>

interface BookmarksActions extends BookmarksQuote {
  id_user: string
}

interface BookmarksProps {
  id_user: string,
  list: number[]
}

interface IGetBookmarksReturn {
  data: any[]
  error?: PostgrestError | null
}

/** 
 * Функция которая получает закладки пользователя
 * @param {string} id_user - ID пользователя
 * @param {array} list - Массив который хранит в себе ID цитат
 * 
 */
export const getBookmarks = async ({
  id_user,
  list,
}: BookmarksProps): Promise<IGetBookmarksReturn> => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses('getBookmarks')
  let status: any = handleSuccess

  handlePending()

  const { data, error } = await supabase
    .from(Tables.bookmarks)
    .select(`
    id_quote,
    quote:id_quote (
      text
    )
  `)
    .match({ 'id_user': id_user })
    .in('id_quote', list)

  if (error) {
    status = handleFailure(error.message)
  }

  status()

  return {
    data: data || [],
    error,
  }
}

/** 
 *  Функция добавления в закладки
 * @param {string} id_user - ID пользователя
 * @param {number} id_quote - ID цитаты
 */
export const addBookmark = async ({
  id_user,
  id_quote,
}: BookmarksActions): Promise<boolean> => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses('addBookmark')

  handlePending()

  const { error } = await supabase
    .from(Tables.bookmarks)
    .insert({
      id_user,
      id_quote,
    })

  if (error) {
    handleFailure(error.message)

    return false
  }

  Store.dispatch(quoteMethods.updateQuotes({
    bookmarked: true,
    id: id_quote,
  }))

  handleSuccess('Добавлено в закладки')

  return false
}

/** 
 * Функция удаления цитаты из закладок
 * @param {string} id_user - ID пользователя
 * @param {number} id_quote - ID цитаты
 */
export const deleteBookmark = async ({
  id_user,
  id_quote,
}: BookmarksActions): Promise<boolean> => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses('removeBookmark')

  handlePending()

  const { error } = await supabase
    .from(Tables.bookmarks)
    .delete()
    .match({
      id_user,
      id_quote,
    })

  if (error) {
    handleFailure(error.message)

    return false
  }

  Store.dispatch(quoteMethods.updateQuotes({
    bookmarked: false,
    id: id_quote
  }))

  handleSuccess()

  return false
}

export const deleteBookmarks = async (id: QuoteID): Promise<true | null> => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses('deleteBookmarks')

  handlePending()

  const { error } = await supabase.from(Tables.bookmarks)
    .delete({ returning: 'minimal' })
    .match({ id_quote: id })

  if (error) {
    handleFailure(error.message)

    return null
  }

  handleSuccess()

  return true
} 