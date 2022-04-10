import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getAuthors } from 'utils/authors'
import {
  AUTHORS_TEXT,
} from 'pages/quotes/quotes-all/constants'
import useResponse from 'helpers/useResponse'
import {
  getUrlParam,
  updateUrlParams,
} from 'helpers/urlParams'

import { Stores } from 'services'

interface IUseFilters {

}

const useFilters = ({

}: IUseFilters) => {
  const [openedAuthors, setOpenedAuthors] = useState<boolean>(false)
  const {
    NotificationStore: {
      loading
    },
    AuthorStore: {
      authorsCount,
      authors
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

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>, path: string) => {
    let authors: any = getUrlParam('authors')

    if (authors) {
      authors = JSON.parse(authors)
    } else {
      authors = []
    }

    if (event.currentTarget.checked) {
      authors.push(path)

      updateUrlParams({
        authors: JSON.stringify(authors),
      })
    }
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