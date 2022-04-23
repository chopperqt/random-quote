import { useEffect } from 'react'

import { getQuote, getRandomQuote } from 'utils/quotes'
import useResponse from 'helpers/useResponse'
import {
  changeDocumentTitle,
  DocumentTitles
} from 'helpers/documentTitle'
import { getUrlParam } from 'helpers/urlParams'

import { Stores } from 'services'

const useHome = () => {
  const { NotificationStore } = Stores()
  const { loading } = NotificationStore
  const idFromUrl = Number(getUrlParam('qq'))
  const loadingStatus = idFromUrl ? loading.getQuote : loading.getRandomQuote

  const {
    isLoading,
    isError,
    isSuccess,
  } = useResponse({
    loading: loadingStatus,
  })

  const handleChangeQuote = () => {
    getRandomQuote()
  }

  useEffect(() => {
    changeDocumentTitle(DocumentTitles.home)

    if (idFromUrl) {
      getQuote(idFromUrl)

      return
    }

    getRandomQuote()
  }, [])

  return {
    isLoading,
    isError,
    isSuccess,
    handleChangeQuote,
  }
}

export default useHome