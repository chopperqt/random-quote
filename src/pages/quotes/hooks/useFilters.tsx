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
import { getUrlParam } from 'helpers/urlParams'
import { ChangeReturn } from 'components/multi-select/MultiSelect'

const DEFAULT_PAGE = 1

const useFilters = () => {
  const { user } = useUser()
  const searchParam = getUrlParam('search')
  const authorsParam = getUrlParam('authors')
  const [openedAuthors, setOpenedAuthors] = useState<boolean>(false)
  const {
    NotificationStore: { loading },
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
    loading: loading.getFilterQuotesCount
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

  const handleChangeSelector = (value: ChangeReturn) => {
    Store.dispatch(filterMethods.updateFilters({
      authors: value.lists.map(_ => _.key)
    }))
  }

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
      search: searchParam ?? '',
      from,
      to,
      authors: filters.authors,
    })
  }, [
    filters.authors,
    from,
    to,
    searchParam,
  ])

  useEffect(() => {
    getAuthors()
  }, [])

  const defaultAuthors = useMemo(() => {
    if (!!!filters.authors) {
      return []
    }

    const authorsFromParam = filters.authors.map(_ => {
      const findAuthor = authors.find(__ => __.id_author === _)

      return findAuthor
    })


    return authorsFromParam.filter(_ => _ !== undefined).map(_ => ({
      key: _!.id_author,
      value: _!.name,
    }))


  }, [openedAuthors])

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
    handleChangeSelector,
    defaultAuthors,
  }
}

export default useFilters