import {
  useState,
  useEffect,
  useMemo,
} from 'react'

import { Stores } from 'services'
import { getAuthors } from 'utils/authors'

interface UseEditProps {
  idAuthor: number
}
export const useEdit = ({
  idAuthor,
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

  const { options, defaultOption } = useMemo(() => {
    const options = authors.map(({
      id_author,
      name,
    }) => ({
      key: id_author,
      label: name,
    }))

    const defaultOption = options.filter(({ key }) => key === idAuthor)[0]

    return {
      options,
      defaultOption,
    }
  }, [
    authors,
    idAuthor,
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