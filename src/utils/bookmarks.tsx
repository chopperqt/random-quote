import { PostgrestError } from "@supabase/supabase-js";

import loadingStatuses from "helpers/loadingStatuses";
import Store, { quoteMethods } from "services";
import supabase from "./client";
import { Tables } from "./constants";

const BookmarkRequests = {
  addBookmark: 'addBookmark',
  removeBookmark: 'removeBookmark',
  getBookmarks: 'getBookmarks',
}

interface IActionBookmarkProps {
  id_user: string
  id_quote: number
}

interface IActionBookmarkReturn {
  data: any[]
  error?: PostgrestError | null
}

interface IGetBookmarksProps {
  id_user: string,
  list: number[]
}

interface IGetBookmarksReturn {
  data: any[]
  error?: PostgrestError | null
}

export const getBookmarks = async ({
  id_user,
  list,
}: IGetBookmarksProps): Promise<IGetBookmarksReturn> => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses(BookmarkRequests.getBookmarks)
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
    status = handleFailure(error)
  }

  status()

  return {
    data: data || [],
    error,
  }
}

export const addBookmark = async ({
  id_user,
  id_quote,
}: IActionBookmarkProps): Promise<boolean> => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses(BookmarkRequests.addBookmark)

  handlePending()

  const { error } = await supabase
    .from(Tables.bookmarks)
    .insert({
      id_user,
      id_quote,
    })

  if (error) {
    handleFailure(error)

    return false
  }

  Store.dispatch(quoteMethods.updateQuotes(true, id_quote))

  handleSuccess('Добавлено в закладки')

  return false
}

export const deleteBookmark = async ({
  id_user,
  id_quote,
}: IActionBookmarkProps): Promise<boolean> => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses(BookmarkRequests.removeBookmark)

  handlePending()

  const { error } = await supabase
    .from(Tables.bookmarks)
    .delete()
    .match({
      id_user,
      id_quote,
    })

  if (error) {
    handleFailure(error)

    return false
  }

  Store.dispatch(quoteMethods.updateQuotes(false, id_quote))

  handleSuccess()

  return false
}