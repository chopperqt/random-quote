import { useEffect } from 'react'

import { getQuote, getRandomQuote } from 'utils/quotes'
import useResponse from 'helpers/useResponse'
import {
  changeDocumentTitle,
  DocumentTitles
} from 'helpers/documentTitle'
import { getUrlParam } from 'helpers/urlParams'

import { Stores } from 'services'
import { decreaseQuoteCounter, increaseQuoteCounter } from 'services/quotes/actions'

const ArrowKeys = {
  right: 'ArrowRight',
  left: 'ArrowLeft',
}

const useHome = () => {
  const { NotificationStore } = Stores()
  const { loading } = NotificationStore
  const idFromUrl = Number(getUrlParam('qq'))

  const quoteRequestStatus = useResponse({
    loading: loading.getQuote,
  })

  const randomQuoteRequestStatus = useResponse({
    loading: loading.getRandomQuote,
  })

  const handleClickArrow = (event: KeyboardEvent) => {
    if (event.code === ArrowKeys.right) {
      increaseQuoteCounter()
    }

    if (event.code === ArrowKeys.left) {
      decreaseQuoteCounter()
    }
  }

  const handleChangeQuote = () => {
    getRandomQuote()
  }

  useEffect(() => {
    changeDocumentTitle(DocumentTitles.home)

    window.addEventListener('keydown', handleClickArrow)

    if (idFromUrl) {
      getQuote(idFromUrl)

      return
    }

    getRandomQuote()

    return () => {
      window.removeEventListener('keydown', handleClickArrow)
    }
  }, [])

  return {
    quoteRequestStatus,
    randomQuoteRequestStatus,
    handleChangeQuote,
  }
}

export default useHome