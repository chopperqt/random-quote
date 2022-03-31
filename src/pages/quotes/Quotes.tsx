import React from 'react'

import QuotesLastUpdate from './quotes-last-update/QuotesLastUpdate'
import QuotesAll from './quotes-all/QuotesAll'
import Footer from 'components/footer'

import styles from './Quotes.module.scss'

const Quotes = () => {
  return (
    <div className={styles.layout}>
      <QuotesLastUpdate />
      <QuotesAll />
      <Footer className={styles.footer} />
    </div>
  )
}

export default Quotes