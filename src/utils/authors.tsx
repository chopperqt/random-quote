import supabase from "./client";

import Store, { notificationMethods, authorsMethods } from 'services'
import { Tables } from './constants'
import loadingStatuses, { ActionsStatus } from "helpers/loadingStatuses";
import { FormFields } from "pages/admin-panel/admin-panel-author/add/Add";
import { uploadFile } from "./upload";
import { translateUrl } from 'helpers/translateUrl'

const DEFAULT_URL = 'https://gkywdfbpxquelncihepl.supabase.co/storage/v1/object/public/'

export type AuthorsRequests =
  'getAuthors' |
  'createAuthor'

export const getAuthors = async () => {
  Store.dispatch(notificationMethods.loadingRequest('getAuthors', ActionsStatus.pending))

  const { data, error, count } = await supabase
    .from(Tables.authors)
    .select("*", { count: 'exact' });

  if (error) {
    const { message } = error

    Store.dispatch(notificationMethods.loadingRequest('getAuthors', ActionsStatus.failure))

    notificationMethods.createNotification(message, 'ERROR')
  }

  Store.dispatch(notificationMethods.loadingRequest('getAuthors', ActionsStatus.success))
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

  const response = await uploadFile(author.avatar)

  if (typeof response !== 'string') {
    return
  }

  const { data, error } = await supabase
    .from(Tables.authors)
    .insert({
      avatar: `${DEFAULT_URL}${response}`,
      name: `${author.surName} ${author.name} ${author.secondName}`,
      path: translateUrl(`${author.surName} ${author.name} ${author.secondName}`)
    })
    .single()

  if (error) {
    handleFailure(error)

    return
  }

  handleSuccess()

  console.log(data)
}