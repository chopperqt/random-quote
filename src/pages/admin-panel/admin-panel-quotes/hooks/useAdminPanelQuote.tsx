import {
  useMemo,
  useEffect,
} from 'react'

import { Stores } from 'services'
import { TableAction } from 'components/table'
import Edit from '../edit/Edit'
import { getQuotes } from 'utils/quotes'
import { getRange } from 'helpers/pagination'
import moment from 'moment'
import { getUrlParam } from 'helpers/urlParams'
import Delete from '../delete/Delete'

const useAdminPanelQuote = () => {
  const {
    QuoteStore: {
      quotesAll,
      quotesAllCount,
    },
    NotificationStore: {
      loading: {
        getQuotes: loading,
        deleteQuote: statusDeleteQuote,
      }
    }
  } = Stores()

  const isLoadingDeleteQuote = statusDeleteQuote?.status === 'PENDING'

  const currentPage = getUrlParam('p') || 1

  const {
    from,
    to,
  } = getRange(+currentPage)

  const columns = useMemo(() => [
    {
      Header: 'ID',
      accessor: 'id_quote',
    },
    {
      Header: 'Цитата',
      accessor: 'text',
      width: 600,
    },
    {
      Header: 'Автор',
      accessor: 'author',
    },
    {
      Header: 'Дата создания',
      accessor: 'created_at',
    },
    {
      Header: 'Опции',
      accessor: 'actions',
    }
  ], [])

  const formattedData = quotesAll.map((quote) => ({
    ...quote,
    author: quote.author.name || '',
    created_at: moment().from(quote.created_at.toString()),
    actions: (
      <TableAction
        deleteElement={
          <Delete
            quoteID={quote.id_quote}
            isLoading={isLoadingDeleteQuote}
          />
        }
        editElement={
          <Edit
            quoteID={quote.id_quote}
            authorID={quote.id_author}
            createdAt={quote.created_at}
            quote={quote.text}
          />
        }
      />
    )
  }))

  const pages = useMemo(() => {
    return Math.ceil(quotesAllCount / 10)
  }, [quotesAllCount])

  useEffect(() => {
    getQuotes({
      from,
      to,
    })
  }, [
    currentPage,
    from,
    to,
  ])

  return {
    currentPage: +currentPage,
    columns,
    pages,
    formattedData,
    loading,
  }
}

export default useAdminPanelQuote