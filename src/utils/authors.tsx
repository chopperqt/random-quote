import supabase from "./client";

import Store, { authorsMethods } from 'services'
import { Tables } from './constants'
import loadingStatuses from "helpers/loadingStatuses";
import { FormFields } from "pages/admin-panel/admin-panel-author/add/Add";
import { deleteFile, uploadFile } from "./upload";
import { translateUrl } from 'helpers/translateUrl'
import { AuthorApi, AuthorID, AuthorImage } from "models/author.type";
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

interface CreateAuthor extends FormFields {
  avatar: FileList,
}
export const createAuthor = async (author: CreateAuthor) => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses('createAuthor')

  handlePending()

  const avatar = await uploadFile(author.avatar)

  if (!avatar?.Key) {
    handleFailure()

    return
  }

  const formattedAvatar = getNormalizedAvatar(avatar.Key)

  const {
    data,
    error,
  } = await supabase
    .from(Tables.authors)
    .insert({
      avatar: formattedAvatar,
      name: `${author.surName} ${author.name} ${author.secondName}`,
      path: translateUrl(`${author.surName} ${author.name} ${author.secondName}`)
    })
    .single()

  if (error) {
    handleFailure(error.message)

    return
  }

  handleSuccess()

  console.log(data)
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

  getAuthors()

  return data
}