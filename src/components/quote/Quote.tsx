import React from 'react'
import cx from 'classnames'
import moment from 'moment'

import { routes } from 'helpers/routes'
import Link from 'components/link'
import Icon, { IconList } from 'components/icon'
import useQuote from './hooks/useQuote'
import { updateQuoteLikes } from 'utils/quotes'
import Likes from './likes/Likes'

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
    rating,
    action,
  } = quote
  const {
    handleCopyText,
    handleClickLike,
    handleClickDislike,
    isLoadingLike,
    disableDislike,
    disableLike,
  } = useQuote({
    text: quote.text,
    id: id_quote,
    action: action,
  })

  return (
    <div className={cx(styles.layout, 'item-content')}>
      <Likes
        disableDislike={disableDislike}
        disableLike={disableLike}
        count={rating}
        loading={isLoadingLike}
        onClickLike={handleClickLike}
        onClickDislike={handleClickDislike}
      />
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

    </div >
  )
}

export default Quote