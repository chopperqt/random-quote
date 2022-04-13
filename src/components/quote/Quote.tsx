import React from 'react'
import cx from 'classnames'
import moment from 'moment'

import { routes } from 'helpers/routes'
import QuoteSkeleton from './quote-skeleton/QuoteSkeleton'
import Link from 'components/link'
import Icon, { IconList } from 'components/icon'
import useQuote from './hooks/useQuote'

import styles from './Quote.module.scss'

import { IQuoteProps } from './'

const Quote = ({
  quote
}: IQuoteProps) => {
  const {
    created_at,
    text,
    likes,
    author: {
      path,
      name
    }
  } = quote
  const {
    handleCopyText,
  } = useQuote({
    text: quote.text,
  })

  return (
    <div className={cx(styles.layout, 'item-content')}>
      <div className={styles.sectionLike}>
        <button className={styles.button}>
          <Icon icon={IconList.chevronUp} />
        </button>
        <div>{likes}</div>
        <button className={styles.button}>
          <Icon icon={IconList.chevronDown} />
        </button>
      </div>
      <div className={styles.sectionQuote}>
        <div className={cx(styles.text, "heading--ls")}>
          {text}
        </div>
        <div className={styles.info}>
          <div className="heading--sm">{moment(created_at).fromNow()}</div>
          <div className={styles.actions}>
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
            to={`${routes.authors}/${path}`}
            className="heading--sm text--right"
          >{name}</Link>
        </div>
      </div>

    </div>
  )
}

export default Quote