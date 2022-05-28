import React from 'react'
import cx from 'classnames'
import moment from 'moment'

import { routes } from 'helpers/routes'
import Link from 'components/link'
import useQuote from './hooks/useQuote'
import Bookmark from './bookmark/Bookmark'
import Actions from './action/Actions'

import styles from './Quote.module.scss'

import { IQuoteProps } from './'

const Quote = ({
  quote,
}: IQuoteProps) => {
  const {
    created_at,
    text,
    id_quote,
    path,
    name,
    bookmarked,
  } = quote
  const {
    handleCopyText,
  } = useQuote({
    text: quote.text,
    id: id_quote,
  })
  const formattedDate = moment(created_at).fromNow()

  return (
    <div className={cx(styles.layout, 'item-content')}>
      <div className={styles.sectionRating}>
        <Bookmark
          bookmarked={!!bookmarked}
          id={id_quote}
        />
        <Actions
          onCopy={handleCopyText}
        />
      </div>
      <div className={styles.sectionQuote}>
        <div className={cx(styles.text, "heading--ls")}>
          {text}
        </div>
        <div className={styles.info}>
          <div className="heading--sm">{formattedDate}</div>
          <Link
            to={`${routes.authors}/${path}`}
            className="heading--sm text--right text--bold"
          >{name}</Link>
        </div>
      </div>
    </div >
  )
}

export default React.memo(Quote)