import {
  useEffect,
  useMemo,
} from 'react'

import { Stores } from 'services'
import { getAuthors } from 'utils/authors'
import {
  TableAction,
  TableAuthor,
} from 'components/table'
import Delete from '../delete/Delete'

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
    },
  ], [])

  const data = useMemo(() => {
    return authors.map((author) => ({
      ...author,
      avatar: (
        <TableAuthor
          name={author.name}
          avatar={author.avatar}
          height={30}
        />
      ),
      actions: (
        <TableAction
          editElement={(<div></div>)}
          deleteElement={(
            <Delete
              authorID={author.id_author}
              authorImage={author.avatar}
            />
          )}
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
    isError,
    data,
  }
}

export default useAdminPanelAuthors