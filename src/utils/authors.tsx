import supabase from "./client";

import Store, { notificationMethods, authorsMethods } from 'services'
import { Tables } from './constants'
import { ActionsStatus } from "helpers/loadingStatuses";

export type AuthorsRequests = 'getAuthors'

const Storages = {
  images: 'images',
}

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