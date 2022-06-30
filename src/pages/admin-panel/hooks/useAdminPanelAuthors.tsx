import {
  useEffect,
  useMemo,
} from 'react'

import { Stores } from 'services'
import { getAuthors } from 'utils/authors'
import { TableAction } from 'components/table'

const useAdminPanelAuthors = () => {
  const {
    AuthorStore: {
      authors,
    },
    NotificationStore: {
      loading: {
        getAuthors: loading,
      }
    }
  } = Stores()

  const isLoading = loading?.status !== 'SUCCESS'

  const columns = useMemo(() => [
    {
      Header: 'ID',
      accessor: 'id_author',
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Create At',
      accessor: 'created_at',
    },
    {
      Header: 'Path',
      accessor: 'path',
    },
    {
      Header: 'Actions',
      accessor: 'actions',
    },
  ], [])

  const data = useMemo(() => {
    return authors.map((author) => ({
      ...author,
      actions: (
        <TableAction
          onDelete={() => { }}
          onEdit={() => { }}
        />
      )
    }))
  }, [authors])


  useEffect(() => {
    getAuthors()
  }, [])


  return {
    authors,
    columns,
    isLoading,
    data,
  }
}

export default useAdminPanelAuthors