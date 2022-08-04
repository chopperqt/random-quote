import {
  useMemo,
  useEffect,
} from 'react'

import { Stores } from 'services'
import { TableAction } from 'components/table'
import Edit from '../admin-panel-quotes/edit/Edit'
import { getQuotes } from 'utils/quotes'
import { getRange } from 'helpers/pagination'
import moment from 'moment'

const useAdminPanelQuote = () => {
  const {
    QuoteStore: {
      quotesAll,
      quotesAllCount,
    },
    FilterStore: {
      filters: {
        p: currentPage = 1,
      }
    },
    NotificationStore: {
      loading: {
        getQuotes: loading,
      }
    }
  } = Stores()

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
        onDelete={() => { }}
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