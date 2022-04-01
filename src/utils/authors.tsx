import supabase from "./client";

import Store, { notificationMethods } from 'services'
import { Tables } from './constants'

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

  console.log(data)
}