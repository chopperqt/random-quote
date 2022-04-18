import { PostgrestError } from "@supabase/supabase-js";

import loadingStatuses from "helpers/loadingStatuses";
import supabase from "./client";
import { Tables } from "./constants";

const BookmarkRequests = {
  addBookmark: 'addBookmark',
  getBookmarks: 'getBookmarks',
}

interface IAddBookmarkProps {
  id_user: string
  id_quote: number
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
}: IAddBookmarkProps) => {

  const { data, error } = await supabase
    .from(Tables.bookmarks)
    .insert({
      id_user,
      id_quote,
    })

  console.log(data)
}