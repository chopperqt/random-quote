import React, { Suspense, useMemo } from 'react'

import { QuoteSkeleton } from 'components/quote'
import useHome from './hooks/useHome'
import Footer from 'components/footer'
import Information, { DefaultMessage } from 'components/Information'
import { Stores } from 'services'
import {
  increaseQuoteCounter,
  decreaseQuoteCounter,
} from 'services/quotes/actions'
import { HELPER_HOTKEY_TEXT } from './constants'
import ActionButtons from './partials/ActionButtons'
import useUser from 'helpers/useUser'
import { getControlCount } from './helpers/getControlCount'

import styles from './Home.module.scss'

const LazyQuote = React.lazy(() => import('components/quote'))

const Home = () => {
  const {
    QuoteStore: {
      quotes,
      quotesCount,
      currentQuote,
    }
  } = Stores()
  const { user } = useUser()
  const {
    isError,
    isLoading,
    isSuccess,
    quote,
  } = useHome()

  return (
    <div className={styles.home}>
      <div className={styles.quote}>
        <div>{HELPER_HOTKEY_TEXT}</div>
        {isLoading && (
          <QuoteSkeleton />
        )}
        {isSuccess && !!quote && (
          <Suspense fallback={<QuoteSkeleton />}>
            <LazyQuote
              loading={isLoading}
              text={quote.text}
              author={quote.author}
              id_author={quote.id_author}
              id_quote={quote.id_quote}
              created_at={quote.created_at}
              bookmarked={quote.bookmarked}
            />
          </Suspense>
        )}
        {isError && (
          <Information text={DefaultMessage.error} />
        )}
        <div className={styles.footer}>
          <Footer />
        </div>
        <ActionButtons
          disabled={isLoading}
          onClickLeft={decreaseQuoteCounter}
          onClickRight={() => increaseQuoteCounter(user?.id)}
          disabledLeft={quotesCount === 0}
        />
      </div>
    </div>
  )
}

export default Home