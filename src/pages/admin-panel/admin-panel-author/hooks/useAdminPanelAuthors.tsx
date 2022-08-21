import {
  useEffect,
  useMemo,
} from 'react'

import { Stores } from 'services'
import { getAuthors } from 'utils/authors'

import { getNormalizeAuthor } from '../helpers/getNormalizedAuthor'

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
  const isError = loading?.isError

  const columns = useMemo(() => [
    {
      Header: 'ID',
      accessor: 'id_author',
      width: 30,
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
      Header: 'Avatar',
      accessor: 'avatar'
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      width: 100,
    },
  ], [])

  const normalizedAuthors = useMemo(() => {
    return authors.map(getNormalizeAuthor)
  }, [authors])

  useEffect(() => {
    getAuthors()
  }, [])

  return {
    authors,
    columns,
    isLoading,
    isError,
    normalizedAuthors,
  }
}

export default useAdminPanelAuthors