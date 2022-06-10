import React, { Suspense } from 'react'

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

import styles from './Home.module.scss'

const LazyQuote = React.lazy(() => import('components/quote'))

const Home = () => {
  const {
    QuoteStore: {
      quotes,
      quotesCount,
      quotesControl
    }
  } = Stores()
  const { user } = useUser()

  const {
    isError,
    isLoading,
    isSuccess,
  } = useHome()

  return (
    <div className={styles.home}>
      <div className={styles.quote}>
        <div>{HELPER_HOTKEY_TEXT}</div>
        {isLoading && (
          <QuoteSkeleton />
        )}
        {isSuccess && (
          <Suspense fallback={<QuoteSkeleton />}>
            <LazyQuote
              quote={quotes[quotesControl - 1]}
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