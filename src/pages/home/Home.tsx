import React from 'react'

import Quote, { QuoteSkeleton } from 'components/quote'
import useHome from './hooks/useHome'
import Footer from 'components/footer'
import Information, { DefaultMessage } from 'components/Information'
import { Stores } from 'services'
import { HELPER_HOTKEY_TEXT } from './constants'

import styles from './Home.module.scss'

const Home = () => {
  const { QuoteStore: { quotes, quoteCounter } } = Stores()
  const {
    quoteRequestStatus,
    randomQuoteRequestStatus,
  } = useHome()

  return (
    <div className={styles.home}>
      <div className={styles.quote}>
        <div>{HELPER_HOTKEY_TEXT}</div>
        {(quoteRequestStatus.isLoading || randomQuoteRequestStatus.isLoading) && (
          <QuoteSkeleton />
        )}
        {(quoteRequestStatus.isSuccess || randomQuoteRequestStatus.isSuccess) && (
          <Quote
            loading={quoteRequestStatus.isLoading || randomQuoteRequestStatus.isLoading}
            quote={quotes[quoteCounter]}
          />
        )}
        {(quoteRequestStatus.isError || randomQuoteRequestStatus.isError) && (
          <Information text={DefaultMessage.error} />
        )}
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Home