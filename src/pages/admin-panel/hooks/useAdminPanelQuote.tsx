import { useMemo } from 'react'
import { Stores } from 'services'
import { TableAction } from 'components/table'

const useAdminPanelQuote = () => {
  const {
    QuoteStore: {
      quotesAll,
    },
    NotificationStore: {
      loading: {
        getQuotes: loading,
      }
    }
  } = Stores()

  const columns = useMemo(() => [
    {
      Header: 'ID',
      accessor: 'id_quote',
    },
    {
      Header: 'Quote',
      accessor: 'text',
      width: 600,
    },
    {
      Header: 'Author',
      accessor: 'author',
    },
    {
      Header: 'Create At',
      accessor: 'created_at',
    },
    {
      Header: 'Actions',
      accessor: 'actions',
    }
  ], [])

  const formattedData = quotesAll.map((quote) => ({
    ...quote,
    author: quote.author.name || '',
    actions: (
      <TableAction
        onDelete={() => { }}
        onEdit={() => { }}
      />
    )
  }))


  return {
    columns,
    formattedData,
    loading,
  }
}

export default useAdminPanelQuote