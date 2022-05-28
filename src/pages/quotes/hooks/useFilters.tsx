import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react'

import { getAuthors } from 'utils/authors'
import {
  AUTHORS_TEXT,
  SHOW_FILTERS,
} from 'pages/quotes/quotes-all/constants'
import useResponse from 'helpers/useResponse'
import Store, {
  Stores,
  filterMethods,
} from 'services'
import {
  getFilterQuotesCounter,
  getQuotes,
} from 'utils/quotes'
import { getRange } from 'helpers/pagination'
import useUser from 'helpers/useUser'

const DEFAULT_PAGE = 1

const useFilters = () => {
  const { user } = useUser()
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
      count,
    }
  } = Stores()
  const {
    from,
    to,
  } = getRange(DEFAULT_PAGE)

  const handleOpenAuthors = () => setOpenedAuthors(true)
  const handleCloseAuthors = () => setOpenedAuthors(false)

  const {
    isLoading,
    isSuccess,
  } = useResponse({
    loading: loading.getAuthors,
    count: authorsCount,
  })

  const filtersCount = useResponse({
    loading: loading.getFilterQuotesCounter
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

  const handleClickButton = useCallback(() => {
    getQuotes({
      from,
      to,
      authors: filters.authors
    })
  }, [filters])

  const handleReset = () => {
    getQuotes({
      from,
      to,
      id: user?.id,
    })
  }

  const authorsTitle = useMemo(() => {
    return `${AUTHORS_TEXT} (${authorsCount})`
  }, [authorsCount])

  const buttonText = useMemo(() => {
    if (count > 0) {
      return `${SHOW_FILTERS} (${count})`
    }

    return SHOW_FILTERS
  }, [count])

  useEffect(() => {
    getFilterQuotesCounter({
      from,
      to,
      authors: filters.authors,
    })
  }, [filters.authors])

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
    buttonText,
    handleClickButton,
    handleReset,
    filtersCount,
  }
}

export default useFilters