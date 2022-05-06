import { useEffect } from 'react'
import product from 'immer'

import {
  getQuote,
  getRandomQuote,
} from 'utils/quotes'
import useResponse from 'helpers/useResponse'
import {
  changeDocumentTitle,
  DocumentTitles
} from 'helpers/documentTitle'
import {
  getUrlParam,
  updateUrlParams,
} from 'helpers/urlParams'
import Store, { quoteMethods, Stores, UserMethods } from 'services'
import {
  decreaseQuoteCounter,
  increaseQuoteCounter,
} from 'services/quotes/actions'
import useUser from 'helpers/useUser'

const ArrowKeys = {
  right: 'ArrowRight',
  left: 'ArrowLeft',
}

const useHome = () => {
  const {
    NotificationStore: {
      loading,
    },
    QuoteStore: {
      quoteCounter,
      quotes,
    }
  } = Stores()
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
      increaseQuoteCounter(user?.id)
    }

    if (event.code === ArrowKeys.left) {
      decreaseQuoteCounter()
    }
  }

  const handleChangeQuote = () => {
    if (isLoading || loading.getRandomQuote === 'PENDING') {
      return
    }

    getRandomQuote(user?.id)
  }

  useEffect(() => {
    changeDocumentTitle(DocumentTitles.home)
    Store.dispatch(UserMethods.setUser({
      email: 'test',
      id: 'test',
      role: 'test',
      avatar_url: 'https://',
    }))


    setTimeout(() => {
      Store.dispatch(UserMethods.setUser({
        email: 'test2',
        id: 'tes2t',
        role: 'test2',
        avatar_url: 'https://',
      }))
    }, 5000)

    window.addEventListener('keydown', handleClickArrow)

    if (quotes.length) {
      Store.dispatch(quoteMethods.setCounter(quotes.length - 1, 'quotesCount'))

      return
    }

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
    if (quotes[quoteCounter]?.id_quote) {
      updateUrlParams({ qq: quotes[quoteCounter].id_quote })
    }
  }, [quotes, quoteCounter])

  return {
    isLoading,
    isSuccess,
    isError,
    handleChangeQuote,
  }
}

export default useHome