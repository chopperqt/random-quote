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
import useUser from 'helpers/useUser'

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
  const { user } = useUser()

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
    getRandomQuote(user?.id)
  }

  useEffect(() => {
    changeDocumentTitle(DocumentTitles.home)

    window.addEventListener('keydown', handleClickArrow)

    if (idFromUrl) {
      getQuote(idFromUrl, user?.id)

      return
    }

    getRandomQuote(user?.id)

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