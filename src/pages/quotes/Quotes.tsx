import React, { useEffect } from 'react'

import QuotesLastUpdate from './quotes-last-update/QuotesLastUpdate'
import QuotesAll from './quotes-all/QuotesAll'
import Footer from 'components/footer'
import { changeDocumentTitle, DocumentTitles } from 'helpers/documentTitle'
import Store, { filterMethods, quoteMethods, Stores } from 'services'

import styles from './Quotes.module.scss'

const Quotes = () => {
  const { getFiltersFromUrl } = filterMethods
  const { clearQuotes } = quoteMethods
  const { FilterStore: { filters } } = Stores()

  useEffect(() => {
    changeDocumentTitle(DocumentTitles.quotes)

    getFiltersFromUrl()

    return () => {
      Store.dispatch(quoteMethods.clearQuotes())
    }
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