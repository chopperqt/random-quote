import React from 'react'
import { useSelector } from 'react-redux'

import Quote from 'components/quote'
import useHome from './hooks/useHome'
import { IStore } from 'services'
import Footer from 'components/footer'

import styles from './Home.module.scss'

const Home = () => {
  const {
    hasLoading,
  } = useHome()
  const quote = useSelector((store: IStore) => store.quotesStore.quote)

  return (
    <div className={styles.home}>
      <div className={styles.quote}>
        <Quote
          loading={hasLoading}
          quote={quote}
        />
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Home