import supabase from "./client";

import Store, { authorsMethods } from 'services'
import { Tables } from './constants'
import loadingStatuses from "helpers/loadingStatuses";
import { FormFields } from "pages/admin-panel/admin-panel-author/add/Add";
import { deleteFile, uploadFile } from "./upload";
import { translateUrl } from 'helpers/translateUrl'
import {
  AuthorApi,
  AuthorID,
  AuthorImage,
} from "models/author.type";
import getNormalizedAvatar from "pages/admin-panel/admin-panel-author/helpers/getNormalizedAvatar";

const DEFAULT_URL = 'https://gkywdfbpxquelncihepl.supabase.co/storage/v1/object/public/'

export const getAuthors = async () => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses('getAuthors')

  handlePending()

  const {
    data,
    error,
    count,
  } = await supabase
    .from(Tables.authors)
    .select("*", { count: 'exact' });

  if (error) {
    handleFailure(error.message)

    return
  }

  handleSuccess()

  Store.dispatch(authorsMethods.getAuthors({
    data,
    count,
  }))
}

export const createAuthor = async (author: FormFields): Promise<AuthorApi[] | null> => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses('createAuthor')

  handlePending()

  const avatar = await uploadFile(author.avatar)

  if (!avatar?.Key) {
    handleFailure()

    return null
  }

  const formattedAvatar = getNormalizedAvatar(avatar.Key)

  const {
    data,
    error,
  } = await supabase
    .from(Tables.authors)
    .insert({
      avatar: `${DEFAULT_URL}${formattedAvatar}`,
      name: `${author.surName} ${author.name} ${author.secondName}`,
      path: translateUrl(`${author.surName} ${author.name} ${author.secondName}`)
    })
    .single()

  if (error) {
    handleFailure(error.message)

    return null
  }

  handleSuccess()

  return data
}

export const deleteAuthor = async (authorID: AuthorID, authorImage: AuthorImage): Promise<AuthorApi[] | null> => {
  const {
    handlePending,
    handleFailure,
    handleSuccess,
  } = loadingStatuses('deleteAuthor')

  handlePending()

  const {
    data,
    error
  } = await supabase
    .from(Tables.authors)
    .delete()
    .match({
      id_author: authorID,
    })

  if (error) {
    handleFailure(error.message)

    return null
  }

  await deleteFile(authorImage)

  handleSuccess()

  return data
}