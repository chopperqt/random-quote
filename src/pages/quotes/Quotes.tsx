import { useEffect } from 'react'

import QuotesAll from './quotes-all/QuotesAll'
import Footer from 'components/footer'
import { changeDocumentTitle, DocumentTitles } from 'helpers/documentTitle'
import { filterMethods } from 'services'

import styles from './Quotes.module.scss'

const Quotes = () => {
  const { getFiltersFromUrl } = filterMethods

  useEffect(() => {
    changeDocumentTitle(DocumentTitles.quotes)

    getFiltersFromUrl()
  }, [])

  return (
    <div className={styles.layout}>
      <QuotesAll />
      <Footer className={styles.footer} />
    </div>
  )
}

export default Quotes