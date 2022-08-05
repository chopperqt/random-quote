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
import Img from 'components/img/Img'

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