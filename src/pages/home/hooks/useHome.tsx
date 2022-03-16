import React, { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { IStore } from 'services'
import { getRandomQuote } from 'utils/quotes'

const useHome = () => {
  const { text, data, author } = useSelector((store: IStore) => store.quotesStore.quote)

  const hasLoading = useMemo(() => {
    if (text) {
      return false
    }

    return true
  }, [text])

  const handleChangeQuote = () => {
    getRandomQuote()
  }

  useEffect(() => {
    getRandomQuote()
  }, [])

  return {
    hasLoading,
    text,
    data,
    author: author?.name || '',
    handleChangeQuote,
  }
}

export default useHome