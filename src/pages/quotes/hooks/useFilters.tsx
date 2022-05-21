import React, { useState, useEffect } from 'react'

import { getAuthors } from 'utils/authors'
import {
  AUTHORS_TEXT,
} from 'pages/quotes/quotes-all/constants'
import useResponse from 'helpers/useResponse'
import { filterMethods } from 'services'

import Store, { Stores } from 'services'

const useFilters = () => {
  const [openedAuthors, setOpenedAuthors] = useState<boolean>(false)
  const {
    NotificationStore: {
      loading
    },
    AuthorStore: {
      authorsCount,
      authors
    },
    FilterStore: {
      filters,
    }
  } = Stores()

  const handleOpenAuthors = () => setOpenedAuthors(true)
  const handleCloseAuthors = () => setOpenedAuthors(false)

  const authorsTitle = `${AUTHORS_TEXT} (${authorsCount})`

  const {
    isLoading,
    isSuccess,
  } = useResponse({
    loading: loading.getAuthors,
    count: authorsCount,
  })

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    let authors = filters.authors || []

    if (event.currentTarget.checked) {
      authors = [...authors, id]

      Store.dispatch(filterMethods.updateFilters({ authors: authors }))

      return
    }

    authors = authors.filter((author: number) => author !== id)

    Store.dispatch(filterMethods.updateFilters({ authors: authors }))

  }

  useEffect(() => {
    getAuthors()
  }, [])

  return {
    handleOpenAuthors,
    handleCloseAuthors,
    openedAuthors,
    authorsTitle,
    isLoading,
    isSuccess,
    authors,
    handleChangeCheckbox,
  }
}

export default useFilters