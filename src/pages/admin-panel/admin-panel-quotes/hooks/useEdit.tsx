import {
  useState,
  useEffect,
  useMemo,
} from 'react'

import { Stores } from 'services'
import { getAuthors } from 'utils/authors'
import { UseEditProps } from '../edit/Edit.types'

export const useEdit = ({
  authorID,
}: UseEditProps) => {
  const {
    NotificationStore: {
      loading
    },
    AuthorStore: {
      authors,
    }
  } = Stores()

  const isUpdateLoading = loading?.postQuote?.status === 'PENDING'
  const isAuthorsLoading = loading?.getAuthors?.status === 'PENDING'

  const [isOpened, setOpened] = useState(false)

  const open = () => {
    setOpened(true)
  }

  const close = () => {
    setOpened(false)
  }

  const options = useMemo(() => {
    return authors.map(({
      id_author,
      name,
    }) => ({
      key: id_author,
      label: name,
    }))
  }, [authors])

  const defaultOption = useMemo(() => {
    return options.filter(({ key }) => key === authorID)[0]
  }, [
    options,
    authorID,
  ])

  useEffect(() => {
    if (isOpened) {
      getAuthors()
    }
  }, [isOpened])

  return {
    open,
    close,
    isOpened,
    isUpdateLoading,
    isAuthorsLoading,
    options,
    defaultOption,
  }
}