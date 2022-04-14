import supabase from "./client";

import Store, { notificationMethods, authorsMethods } from 'services'
import { Tables } from './constants'

export const AuthorsRequests = {
  getAuthors: 'getAuthors'
}

export const getAuthors = async () => {
  Store.dispatch(notificationMethods.loadingRequest('getAuthors', 'PENDING'))

  const { data, error, count } = await supabase
    .from(Tables.authors)
    .select("*", { count: 'exact' });

  if (error) {
    const { message } = error

    Store.dispatch(notificationMethods.loadingRequest('getAuthors', 'FAILURE'))

    notificationMethods.createNotification(message, 'ERROR')
  }

  Store.dispatch(notificationMethods.loadingRequest('getAuthors', 'SUCCESS'))
  Store.dispatch(authorsMethods.getAuthors({
    data,
    count,
  }))
}