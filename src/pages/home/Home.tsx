import React from 'react'

import Quote from 'components/quote'
import useHome from './hooks/useHome'
import Footer from 'components/footer'
import Information, { DefaultMessage } from 'components/Information'

import styles from './Home.module.scss'

const Home = () => {
  const {
    quote,
    isLoading,
    isSuccess,
    isError,
  } = useHome()

  return (
    <div className={styles.home}>
      <div className={styles.quote}>
        {isLoading && (
          <Quote
            loading={isLoading}
            quote={quote}
          />
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