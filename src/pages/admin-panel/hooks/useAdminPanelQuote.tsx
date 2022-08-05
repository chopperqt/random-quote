import {
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react'

import { Stores } from 'services'
import { TableAction, TableDelete } from 'components/table'
import Edit from '../admin-panel-quotes/edit/Edit'
import { deleteQuote, getQuotes } from 'utils/quotes'
import { getRange } from 'helpers/pagination'
import moment from 'moment'
import { getUrlParam } from 'helpers/urlParams'
import { QuoteID } from 'models/quotes.type'

const useAdminPanelQuote = () => {
  const [isOpenedDelete, setOpenedDelete] = useState<boolean>(false)
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

  const closeDelete = () => {
    setOpenedDelete(false)
  }

  const openDelete = () => {
    setOpenedDelete(true)
  }

  const handleDeleteQuote = async (quoteID: QuoteID) => {
    console.log(quoteID, 'sda')
    // const response = await deleteQuote(quoteID)

    // if (!response) {
    //   return
    // }

    closeDelete()
  }

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
          <div>
            <TableDelete
              quoteID={quote.id_quote}
              onClose={closeDelete}
              onOpen={openDelete}
              onClick={handleDeleteQuote}
              opened={isOpenedDelete}
              isLoading={isLoadingDeleteQuote}
            />
          </div>

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