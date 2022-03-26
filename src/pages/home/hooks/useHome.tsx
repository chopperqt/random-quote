import React, { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { IStore } from 'services'
import { getRandomQuote } from 'utils/quotes'

const TIMER_REFRESH = 60000

const useHome = () => {
  const loading = useSelector((store: IStore) => store.notificationsStore.loading)
  const hasLoading = loading.getRandomQuote === 'PENDING'

  const handleChangeQuote = () => {
    getRandomQuote()
  }

  useEffect(() => {
    getRandomQuote()

    setInterval(() => {
      getRandomQuote()
    }, TIMER_REFRESH)
  }, [])

  return {
    hasLoading,
    handleChangeQuote,
  }
}

export default useHome