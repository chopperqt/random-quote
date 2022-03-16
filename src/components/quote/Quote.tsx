import React, { Fragment } from 'react'
import cx from 'classnames'

import {
  QuoteSkeletonAuthor,
  QuoteSkeletonDate,
  QuoteSkeletonText,
} from './quote-skeleton/QuoteSkeleton'

import styles from './Quote.module.scss'

interface IQuote {
  text: string
  data?: string
  author?: string
  loading?: boolean
}

const Quote = ({
  text,
  data = '',
  author = '',
  loading = false,
}: IQuote) => {
  return (
    <div className={styles.layout}>
      {loading && (
        <QuoteSkeletonText />
      )}
      {!loading && (
        <div className={cx(styles.text, "heading--ls")}>
          {text}
        </div>
      )}
      <div className={styles.info}>
        {loading && (
          <Fragment>
            <QuoteSkeletonDate />
            <QuoteSkeletonAuthor />
          </Fragment>
        )}
        {!loading && (
          <Fragment>
            <div className="heading--sm">{data}</div>
            <div className="heading--sm text--right">{author}</div>
          </Fragment>
        )}


      </div>
    </div>
  )
}

export default Quote