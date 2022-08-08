import { useEffect, useMemo } from 'react'

import { Stores } from "services"
import { getAuthors } from 'utils/authors'

interface useAddProps {
  isOpened: boolean
}
const useAdd = ({
  isOpened,
}: useAddProps) => {
  const {
    AuthorStore: {
      authors,
    },
    NotificationStore: {
      loading: {
        postQuote: loading,
        getAuthors: loadingOptions,
      },
    }
  } = Stores()

  const options = useMemo(() => {
    return authors.map(({
      id_author,
      name,
    }) => ({
      key: id_author,
      label: name,
    }))
  }, [authors])

  useEffect(() => {
    if (!isOpened || authors.length) {
      return
    }

    getAuthors()

  }, [authors, isOpened])


  return {
    options,
    loading,
    loadingOptions: loadingOptions?.status === 'PENDING'
  }
}

export default useAdd