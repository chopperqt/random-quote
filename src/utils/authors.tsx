import supabase from "./client";

import Store, { notificationMethods, authorsMethods } from 'services'
import { Tables } from './constants'
import { ActionsStatus } from "helpers/loadingStatuses";

export const AuthorsRequests = {
  getAuthors: 'getAuthors'
}

export const getAuthors = async () => {
  Store.dispatch(notificationMethods.loadingRequest(AuthorsRequests.getAuthors, ActionsStatus.pending))

  const { data, error, count } = await supabase
    .from(Tables.authors)
    .select("*", { count: 'exact' });

  if (error) {
    const { message } = error

    Store.dispatch(notificationMethods.loadingRequest(AuthorsRequests.getAuthors, ActionsStatus.failure))

    notificationMethods.createNotification(message, 'ERROR')
  }

  Store.dispatch(notificationMethods.loadingRequest(AuthorsRequests.getAuthors, ActionsStatus.success))
  Store.dispatch(authorsMethods.getAuthors({
    data,
    count,
  }))
}