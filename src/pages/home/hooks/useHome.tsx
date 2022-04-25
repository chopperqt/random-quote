import { useEffect } from 'react'

import { getQuote, getRandomQuote } from 'utils/quotes'
import useResponse from 'helpers/useResponse'
import {
  changeDocumentTitle,
  DocumentTitles
} from 'helpers/documentTitle'
import { getUrlParam, updateUrlParams } from 'helpers/urlParams'

import { Stores } from 'services'
import { decreaseQuoteCounter, increaseQuoteCounter } from 'services/quotes/actions'

const ArrowKeys = {
  right: 'ArrowRight',
  left: 'ArrowLeft',
}

interface IUseHome {
  quoteCounter: number,
}

const useHome = ({
  quoteCounter,
}: IUseHome) => {
  const { NotificationStore } = Stores()
  const { loading } = NotificationStore
  const idFromUrl = Number(getUrlParam('qq'))

  const {
    isError,
    isLoading,
    isSuccess,
  } = useResponse({
    loading: loading.getQuote,
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

  useEffect(() => {

  }, [quoteCounter])

  return {
    isLoading,
    isSuccess,
    isError,
    handleChangeQuote,
  }
}

export default useHome