import moment from 'moment'
import { produce } from 'immer'

import supabase from "./client";
import Store, {
  quoteMethods,
  notificationMethods,
  filterMethods,
} from 'services'
import { SuccessMessages } from 'helpers/successMessages'
import loadingStatuses from "helpers/loadingStatuses";
import {
  Tables,
  SupabaseFunctions,
} from './constants'
import debounce from 'lodash.debounce';
import { PostgrestError } from '@supabase/supabase-js';
import { deleteBookmarks, getBookmarks } from './bookmarks'
import {
  IPostQuote,
  IGetQuotes,
  SearchQuotesProps,
  GetQuotesSearch,
  QuotesBuild,
} from './'
import { QuoteData } from 'services/quotes/QuotesStore';
import DefaultProps from 'helpers/defaultProps';
import { UserID } from './auth';
import { getUrlParam, updateUrlParams } from 'helpers/urlParams';
import {
  QuoteID,
  QuotesApiOptional,
  QuotesApi,
} from 'models/quotes.type'
import { AuthorID } from 'models/author.type';
import { getRange } from 'helpers/pagination';

const LIMIT_PER_PAGE = 10
const QUERY_QUOTES = '*, author: id_author (name, path)'
const QUERY_AUTHOR = 'id, data:quotes(id_quote,text)'
const DELAY = 800

const createQuotesBuilder = ({
  search,
  from = 0,
  to = 10,
  authors = DefaultProps.array,
  head = false,
  lastUpdates = false,
}: QuotesBuild) => {
  let request = supabase.from(Tables.quotes).select(QUERY_QUOTES, { count: 'exact', head })

  if (lastUpdates) {
    return request.gt("created_at", moment().startOf('day').toISOString())
  }

  if (authors.length) {
    request = request.in('id_author', authors)
  }

  if (search) {
    request = request.textSearch('text', search)
  }

  request = request.range(from, to)

  return request
}

export const getQuote = async (id: QuoteID, idUser?: UserID) => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses('getQuote')

  handlePending()

  const { data, error } = await supabase
    .from(Tables.quotes)
    .select(QUERY_QUOTES)
    .match({ id_quote: id })

  if (error) {
    handleFailure(error)

    return
  }

  let updateData: QuoteData[] = [data[0]]

  if (idUser) {
    const bookmarks = await getBookmarks({ id_user: idUser, list: [data[0].id_quote] })

    if (bookmarks.error) {
      return
    }

    updateData = updateData.map((quote) => {
      const isBookmark = bookmarks.data.find((item) => +item.id_quote === +quote.id_quote)

      return {
        ...quote,
        bookmarked: !!isBookmark,
      }
    })
  }

  updateUrlParams({
    qq: id,
  })

  Store.dispatch(quoteMethods.setQuote(updateData))

  handleSuccess()
}

export const updateQuote = async (id: QuoteID, authorID: AuthorID, quote: QuotesApiOptional): Promise<QuotesApiOptional[] | null> => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses('updateQuote')

  handlePending()

  const { data, error } = await supabase
    .from(Tables.quotes)
    .update(quote)
    .match({ id_quote: id })

  if (error) {
    handleFailure(error)

    return null
  }

  const page = getUrlParam('p') || 1
  const {
    from,
    to,
  } = getRange(+page)

  getQuotes({
    from,
    to,
  })

  handleSuccess()

  return data
}

export const getQuotes = async ({
  from = 1,
  to = 50,
  id,
  authors = DefaultProps.array,
}: IGetQuotes) => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses('getQuotes')

  handlePending()

  const {
    data,
    error,
    count,
  } = await createQuotesBuilder({ from, to, authors })

  if (error) {
    handleFailure(error)

    return
  }

  const updateData = produce(data as QuotesApi[], async (draft) => {
    const list = []

    for (let quote of data) {
      if (quote.id_quote) {
        list.push(quote.id_quote.toString())
      }
    }

    if (id) {
      const bookmarks = await getBookmarks({ id_user: id, list })

      if (bookmarks.error) {
        return draft
      }

      draft = draft.map((item) => {
        const isBookmark = bookmarks.data.find(marked => +item.id_quote === +marked.id_quote)

        return {
          ...item,
          bookmarked: !!isBookmark,
        }

      })
    }

    return draft
  })

  Store.dispatch(quoteMethods.setAllQuotes({
    data: await updateData,
    count: count || 0,
  }))

  handleSuccess()
}

export const getRandomQuote = async (idUser?: UserID): Promise<boolean | PostgrestError> => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses('getQuote')

  handlePending()

  const { data, error } = await supabase.rpc(SupabaseFunctions.getRandomQuote)

  if (error) {
    handleFailure(error)

    return error
  }

  let updateData = [
    {
      created_at: data[0].created_at,
      id_quote: data[0].id_quote,
      id_author: data[0].id_author,
      text: data[0].text,
      author: {
        name: data[0].name,
        path: data[0].path,
      }
    },
  ]

  if (idUser) {
    const bookmarks = await getBookmarks({ id_user: idUser, list: [data[0].id_quote] })

    if (bookmarks.error) {
      handleFailure(bookmarks.error)

      return bookmarks.error
    }

    updateData = data.map((quote: QuoteData) => {
      const isBookmark = bookmarks.data.find((item: QuoteData) => +item.id_quote === +quote.id_quote)

      return {
        ...quote,
        bookmarked: !!isBookmark,
      }
    })
  }

  updateUrlParams({
    qq: updateData[0].id_quote,
  })

  Store.dispatch(quoteMethods.setQuote(updateData))

  handleSuccess()

  return true
}

export const getQuotesAuthors = async (authors: string[]) => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses('getQuotesAuthor')

  handlePending()

  let { data, error } = await supabase
    .from(Tables.quotesAuthor)
    .select(QUERY_AUTHOR)
    .in('id_author', authors);

  if (error) {
    handleFailure(error)

    return
  }

  handleSuccess()

  return data
}

export const getLastQuotes = async () => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses('getQuotesLast')

  handlePending()

  const { data, error, count } = await createQuotesBuilder({ lastUpdates: true })

  if (error) {
    handleFailure(error)

    return
  }

  Store.dispatch(quoteMethods.setLastQuotes({
    data,
    count: count || 0,
  }))

  handleSuccess()
}

export const searchQuote = debounce(async ({
  id,
  authors,
  from,
  to,
  search = '',
}: SearchQuotesProps) => {
  const {
    handlePending,
    handleSuccess,
    handleFailure,
  } = loadingStatuses('searchQuote')

  handlePending()

  const response = await createQuotesBuilder({
    search,
    authors,
    from,
    to,
  })

  const {
    data,
    error,
    count,
  } = response

  if (error) {
    handleFailure(error)

    return
  }

  Store.dispatch(quoteMethods.quotesSearch({
    data,
    count: count || 0
  }))

  handleSuccess()
}, DELAY)

export const deleteQuote = async (quoteID: QuoteID): Promise<QuotesApi[] | null> => {
  const {
    handlePending,
    handleSuccess,
    handleFailure,
  } = loadingStatuses('deleteQuote')

  handlePending()

  const response = await deleteBookmarks(quoteID)

  if (!response) {
    handleSuccess()

    return null
  }

  const { data, error } = await supabase
    .from(Tables.quotes)
    .delete()
    .match({
      id_quote: quoteID,
    })

  console.log('Доходишь ? ')

  if (error) {
    handleFailure(error)

    return null
  }

  handleSuccess()

  const currentPage = getUrlParam('p') || 1
  const {
    from,
    to,
  } = getRange(+currentPage)

  getQuotes({
    from,
    to,
  })

  return data
}

export const postQuote = async ({
  text,
  authorID,
}: IPostQuote): Promise<QuotesApi[] | null> => {
  const {
    handlePending,
    handleSuccess,
    handleFailure,
  } = loadingStatuses('postQuote')

  handlePending()

  const {
    data,
    error,
  } = await supabase
    .from(Tables.quotes)
    .insert({
      text,
      id_author: authorID,
    })
    .single();

  if (error) {
    handleFailure(error)

    notificationMethods.createNotification(error.message, 'ERROR')

    return null
  }

  handleSuccess()

  notificationMethods.createNotification(SuccessMessages.createSuccess, 'SUCCESS')

  const currentPage = getUrlParam("p") || 1

  const {
    from,
    to,
  } = getRange(+currentPage)

  getQuotes({
    from,
    to,
  })

  return data
}

export const getFilterQuotesCounter = async (data: GetQuotesSearch) => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses('getFilterQuotesCount')

  handlePending()

  let response = await createQuotesBuilder(data)

  const { count, error } = response

  if (error) {
    handleFailure(error)

    return
  }

  Store.dispatch(filterMethods.updateFiltersCount(count || 0))

  handleSuccess()
}