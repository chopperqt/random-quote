import React, { useEffect } from 'react'

import QuotesLastUpdate from './quotes-last-update/QuotesLastUpdate'
import QuotesAll from './quotes-all/QuotesAll'
import Footer from 'components/footer'
import { changeDocumentTitle, DocumentTitles } from 'helpers/documentTitle'

import styles from './Quotes.module.scss'

const Quotes = () => {
  useEffect(() => {
    changeDocumentTitle(DocumentTitles.quotes)
  }, [])

  return (
    <div className={styles.layout}>
      <QuotesLastUpdate />
      <QuotesAll />
      <Footer className={styles.footer} />
    </div>
  )
}

export default Quotes