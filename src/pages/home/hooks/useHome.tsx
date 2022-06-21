import {
  useEffect,
  useMemo,
  useRef,
} from 'react'

import {
  getQuote,
  getRandomQuote,
} from 'utils/quotes'
import useResponse from 'helpers/useResponse'
import {
  changeDocumentTitle,
  DocumentTitles
} from 'helpers/documentTitle'
import { getUrlParam, updateUrlParams } from 'helpers/urlParams'
import Store, {
  quoteMethods,
  Stores,
} from 'services'
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
      currentQuote,
      quotes,
    },
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

  const quote = useMemo(() => {
    if (quotes[currentQuote]) {
      updateUrlParams({ qq: quotes[currentQuote].id_quote })
    }

    return quotes[currentQuote]
  }, [
    quotes,
    currentQuote,
  ])

  const handleClickArrow = (event: KeyboardEvent) => {
    if (event.code === ArrowKeys.right) {
      increaseQuoteCounter(user?.id)
    }

    if (event.code === ArrowKeys.left) {
      decreaseQuoteCounter()
    }
  }

  const handleChangeQuote = () => {
    if (isLoading || loading.getRandomQuote.status === 'PENDING') {
      return
    }

    getRandomQuote(user?.id)
  }


  useEffect(() => {
    changeDocumentTitle(DocumentTitles.home)

    window.addEventListener('keydown', handleClickArrow)

    if (currentQuote <= quotes.length && quotes.length !== 0) {
      Store.dispatch(quoteMethods.setCounter(currentQuote, 'currentQuote'))

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

  return {
    quote,
    isLoading,
    isSuccess,
    isError,
    handleChangeQuote,
  }
}

export default useHome