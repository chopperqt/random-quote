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
import { getBookmarks } from './bookmarks'
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
import { updateUrlParams } from 'helpers/urlParams';
import {
  QuoteID,
  QuotesApiOptional,
  QuotesApi,
  AuthorID,
} from 'models/quotes.type'
import { QuotesAuthorID, RelationQuotesAuthorApi } from 'models/quotesAuthors.type';

const LIMIT_PER_PAGE = 10
const QUERY_QUOTES = '*, author: id_author (name, path)'
const QUERY_AUTHOR = 'id, data:quotes(id_quote,text)'
const DELAY = 800


type RelationQuotesAuthorReturn = RelationQuotesAuthorApi[] | null

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

export const updateQuote = async (id: QuoteID, quote: QuotesApiOptional) => {
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

    return
  }

  handleSuccess()
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

export const deleteQuote = async (quoteID: QuoteID) => {
  const {
    handlePending,
    handleSuccess,
    handleFailure,
  } = loadingStatuses('deleteQuote')

  handlePending()

  let { error } = await supabase
    .from(Tables.quotes)
    .delete()
    .match({
      id_quote: quoteID,
    })

  if (error) {
    handleFailure(error)

    return
  }

  handleSuccess()
}

export const postQuote = async ({
  text,
  authorID,
}: IPostQuote) => {
  const {
    handlePending,
    handleSuccess,
    handleFailure,
  } = loadingStatuses('postQuote')

  handlePending()

  let {
    data: createQuote,
    error: createQuoteError,
  } = await supabase
    .from(Tables.quotes)
    .insert({
      text,
      id_author: authorID,
    })
    .single();

  if (createQuoteError) {
    const { message } = createQuoteError

    handleFailure(createQuoteError)

    notificationMethods.createNotification(message, 'ERROR')

    return
  }

  const {
    data: createRelation,
    error: createRelationError,
  } = await supabase
    .from(Tables.quotesAuthor)
    .insert({
      id_author: authorID,
      id_quote: createQuote.id_quote,
    })
    .single();

  if (createRelationError) {
    const { message } = createRelationError

    handleFailure(createRelationError)

    notificationMethods.createNotification(message, 'ERROR')

    console.log(createQuote)

    await deleteQuote(createQuote?.id_quote)

    handleSuccess()

    return
  }

  handleSuccess()

  notificationMethods.createNotification(SuccessMessages.createSuccess, 'SUCCESS')

  return {
    multiLine: createRelation,
    quote: createQuote,
  }

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

export async function getRelationQuotesAuthor(quoteID: QuoteID): Promise<RelationQuotesAuthorReturn> {
  const { data, error } = await supabase
    .from(Tables.quotesAuthor)
    .select('*')
    .match({ id_quote: quoteID })

  if (error) {
    return null
  }

  return data
}

export async function createRelationQuotesAuthor(quoteID: QuoteID, authorID: AuthorID): Promise<RelationQuotesAuthorReturn> {
  const { data, error } = await supabase
    .from(Tables.quotesAuthor)
    .insert({
      id_author: authorID,
      id_quote: quoteID,
    })

  if (error) {
    return null
  }

  return data
}

export async function updateRelationQuotesAuthor(quoteID: QuoteID, authorID?: AuthorID): Promise<RelationQuotesAuthorReturn> {
  const { data, error } = await supabase
    .from(Tables.quotesAuthor)
    .update({
      id_quote: quoteID,
      id_author: authorID,
    })
    .match({
      id_quote: quoteID,
    })

  if (error) {
    return null
  }

  return data
}

export async function deleteRelationQuotesAuthor(id: QuotesAuthorID): Promise<RelationQuotesAuthorReturn> {
  const { data, error } = await supabase
    .from(Tables.quotesAuthor)
    .delete()
    .match({
      id,
    })

  if (error) {
    return null
  }

  return data
}