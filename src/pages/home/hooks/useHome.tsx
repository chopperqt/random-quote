import React, { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { getRandomQuote } from 'utils/quotes'
import { IStore } from 'services'
import useResponse from 'helpers/useResponse'
import { changeDocumentTitle, DocumentTitles } from 'helpers/documentTitle'

const TIMER_REFRESH = 60000

const useHome = () => {
  const quote = useSelector((store: IStore) => store.quotesStore.quote)
  const loading = useSelector((store: IStore) => store.notificationsStore.loading.getRandomQuote)
  const {
    isError,
    isSuccess,
    isLoading,
  } = useResponse({
    loading,
    count: 1,
  })

  const handleChangeQuote = () => {
    getRandomQuote()
  }

  useEffect(() => {
    changeDocumentTitle(DocumentTitles.home)
    getRandomQuote()

    const interval = setInterval(() => {
      getRandomQuote()
    }, TIMER_REFRESH)

    return (
      clearInterval(interval)
    )
  }, [])

  return {
    quote,
    isError,
    isSuccess,
    isLoading,
    handleChangeQuote,
  }
}

export default useHome