import React from 'react'

import Quote, { QuoteSkeleton } from 'components/quote'
import useHome from './hooks/useHome'
import Footer from 'components/footer'
import Information, { DefaultMessage } from 'components/Information'
import { Stores } from 'services'
import { HELPER_HOTKEY_TEXT } from './constants'

import styles from './Home.module.scss'

const Home = () => {
  const { QuoteStore: { quote } } = Stores()
  const {
    isLoading,
    isSuccess,
    isError,
  } = useHome()

  return (
    <div className={styles.home}>
      <div className={styles.quote}>
        <div>{HELPER_HOTKEY_TEXT}</div>
        {isLoading && (
          <QuoteSkeleton />
        )}
        {isSuccess && (
          <Quote
            loading={isLoading}
            quote={quote}
          />
        )}
        {isError && (
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