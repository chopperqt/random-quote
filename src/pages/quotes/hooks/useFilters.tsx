import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getAuthors } from 'utils/authors'
import {
  AUTHORS_TEXT,
} from 'pages/quotes/quotes-all/constants'
import useResponse from 'helpers/useResponse'

import { IStore } from 'services'

interface IUseFilters {

}

const useFilters = ({

}: IUseFilters) => {
  const [openedAuthors, setOpenedAuthors] = useState<boolean>(false)

  const loading = useSelector((store: IStore) => store.notificationsStore.loading.getAuthors)
  const count = useSelector((store: IStore) => store.authorsStore.authorsCount)
  const authors = useSelector((store: IStore) => store.authorsStore.authors)

  const handleOpenAuthors = () => setOpenedAuthors(true)
  const handleCloseAuthors = () => setOpenedAuthors(false)

  const authorsTitle = `${AUTHORS_TEXT} (${count})`

  const {
    isLoading,
    isSuccess,
  } = useResponse({
    loading,
    count,
  })

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
  }
}

export default useFilters