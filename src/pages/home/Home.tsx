import React from 'react'

import Quote, { QuoteSkeleton } from 'components/quote'
import useHome from './hooks/useHome'
import Footer from 'components/footer'
import Information, { DefaultMessage } from 'components/Information'
import { Stores } from 'services'
import { HELPER_HOTKEY_TEXT } from './constants'

import styles from './Home.module.scss'
import Icon, { IconList } from 'components/icon'

const Home = () => {
  const { QuoteStore: { quotes, quoteCounter } } = Stores()
  const {
    isError,
    isLoading,
    isSuccess,
  } = useHome({
    quoteCounter,
  })

  return (
    <div className={styles.home}>
      <div className={styles.quote}>
        <div>{HELPER_HOTKEY_TEXT}</div>
        {isLoading && (
          <QuoteSkeleton />
        )}
        {isSuccess && (
          <Quote
            quote={quotes[quoteCounter]}
          />
        )}
        {isError && (
          <Information text={DefaultMessage.error} />
        )}
        <div className={styles.footer}>
          <Footer />
        </div>
        <div>
          <button>
            <Icon icon={IconList.chevronCircleLeft} />
          </button>
          <button>
            <Icon icon={IconList.chevronCircleRight} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home