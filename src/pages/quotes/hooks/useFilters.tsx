import React, { useState, useEffect } from 'react'

import { getAuthors } from 'utils/authors'

interface IUseFilters {

}

const useFilters = ({

}: IUseFilters) => {
  const [openedAuthors, setOpenedAuthors] = useState<boolean>(false)

  const handleOpenAuthors = () => setOpenedAuthors(true)
  const handleCloseAuthors = () => setOpenedAuthors(false)

  useEffect(() => {
    getAuthors()
  }, [])

  return {
    handleOpenAuthors,
    handleCloseAuthors,
    openedAuthors,
  }
}

export default useFilters