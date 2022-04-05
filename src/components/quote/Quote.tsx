import React from 'react'
import cx from 'classnames'
import moment from 'moment'

import { routes } from 'helpers/routes'
import QuoteSkeleton from './quote-skeleton/QuoteSkeleton'
import Link from 'components/link'
import Icon, { IconList } from 'components/icon'

import styles from './Quote.module.scss'

import { IQuote } from 'services/quotes'
import useQuote from './hooks/useQuote'

interface IQuoteProps {
  loading?: boolean
  quote: IQuote
}

const Quote = ({
  loading = false,
  quote
}: IQuoteProps) => {
  const {
    hasQuote,
    handleCopyText,
  } = useQuote({
    quote,
  })

  if (!hasQuote || loading) {
    return (
      <QuoteSkeleton />
    )
  }

  return (
    <div className={cx(styles.layout, 'item-content')}>
      <div className={cx(styles.text, "heading--ls")}>
        {quote.text}
      </div>
      <div className={styles.info}>
        <div className="heading--sm">{moment(quote.created_at).fromNow()}</div>
        <div className={styles.actions}>
          <button className={styles.button}>
            <Icon icon={IconList.likeOff} />
          </button>
          <button
            onClick={handleCopyText}
            className={styles.button}>
            <Icon icon={IconList.copy} />
          </button>
          <button className={styles.button}>
            <Icon icon={IconList.share} />
          </button>
        </div>
        <Link
          to={`${routes.authors}/${quote.author.path}`}
          className="heading--sm text--right"
        >{quote.author.name}</Link>
      </div>
    </div>
  )
}

export default Quote