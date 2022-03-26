import React, { Fragment } from 'react'
import cx from 'classnames'
import moment from 'moment'

import { routes } from 'helpers/routes'
import {
  QuoteSkeletonAuthor,
  QuoteSkeletonDate,
  QuoteSkeletonText,
} from './quote-skeleton/QuoteSkeleton'
import { translateUrl } from 'helpers/translateUrl'
import Timer from './timer/Timer'
import { IQuote } from 'services/quotes/reducer'

import styles from './Quote.module.scss'

import Link from 'components/link'

interface IQuoteProps {
  loading?: boolean
  quote: IQuote
}

const Quote = ({
  loading = false,
  quote
}: IQuoteProps) => {
  const hasQuote = Object.keys(quote).length !== 0

  if (!hasQuote || loading) {
    return (
      <div className={styles.layout}>
        <QuoteSkeletonText />
        <div className={styles.info}>
          <Fragment>
            <QuoteSkeletonDate />
            <QuoteSkeletonAuthor />
          </Fragment>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.layout}>
      <div className={cx(styles.text, "heading--ls")}>
        {quote.text}
      </div>
      <div className={styles.info}>
        <Fragment>
          <div className="heading--sm">{moment(quote.created_at).fromNow()}</div>
          <Link
            to={`${routes.authors}/${quote.author.path}`}
            className="heading--sm text--right"
          >{quote.author.name}</Link>
        </Fragment>
      </div>
    </div>
  )
}

export default Quote