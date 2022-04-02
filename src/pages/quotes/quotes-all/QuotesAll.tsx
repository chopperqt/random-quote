import React from 'react'

import Skeleton from './partials/Skeleton'
import {
  SEARCH_TEXT,
  SHOW_MORE_TEXT,
} from '../constants'
import Quote from 'components/quote'
import Information, { DefaultMessage } from 'components/Information'
import Button from 'components/button'
import Input from 'components/input'
import Title from './partials/Title'
import useQuotesAll from '../hooks/useQuotesAll'
import Filters from './filters/Filters'
import { translateUrl } from 'helpers/translateUrl'

import styles from './QuotesAll.module.scss'

const QuotesAll = () => {
  const {
    isError,
    isLoading,
    isSuccess,
    description,
    quotesFirstColumn,
    quotesSecondColumn,
    hasMoreQuotes,
  } = useQuotesAll()

  console.log(translateUrl('Никколо Макиавелли'))

  return (
    <div className="container">
      <Title text={description} />
      <Input
        placeholder={SEARCH_TEXT}
        className={styles.field}
      />
      <div className={styles.allQuotes}>
        <Filters />
        <div className={styles.allQuotesWrap}>
          {isSuccess && (
            <>
              <div className={styles.gridColumn}>
                {quotesFirstColumn.map((quote) => (
                  <Quote quote={quote} />
                ))}
              </div>
              <div className={styles.gridColumn}>
                {quotesSecondColumn.map((quote) => (
                  <Quote quote={quote} />
                ))}
              </div>
            </>
          )}
          {isLoading && (
            <Skeleton />
          )}
          {isError && (
            <Information text={DefaultMessage.error} />
          )}
        </div>
      </div>
      {hasMoreQuotes && (
        <div className={styles.button}>
          <Button>
            {SHOW_MORE_TEXT}
          </Button>
        </div>
      )}
    </div>
  )
}

export default QuotesAll