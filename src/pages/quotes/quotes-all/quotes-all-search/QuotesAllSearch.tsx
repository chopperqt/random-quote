import Masonry from 'react-masonry-css'

import { QuoteData } from 'services/quotes'
import Empty from '../empty/Empty'
import Quote from 'components/quote'
import Skeleton from '../partials/Skeleton'
import Information from 'components/Information'
import { DefaultMessage } from 'components/Information'

import styles from './QuotesAllSearch.module.scss'

interface QuotesAllSearchProps {
  isEmpty: boolean
  isSuccess: boolean
  isLoading: boolean
  isError: boolean
  items: QuoteData[]
}
const QuotesAllSearch = ({
  isEmpty,
  isSuccess,
  items,
  isLoading,
  isError,
}: QuotesAllSearchProps) => (
  <div className={styles.wrap}>
    <div className={styles.section}>
      {isEmpty && (
        <Empty />
      )}
      {isSuccess && (
        <Masonry
          breakpointCols={2}
          className="my-masonry-grid"
          columnClassName='my-masonry-grid_column'
        >
          {items.map((quote) => (
            <Quote
              key={quote.id_quote}
              quote={quote}
            />
          ))}
        </Masonry>
      )}
      {isLoading && (
        <Skeleton />
      )}
      {isError && (
        <Information text={DefaultMessage.error} />
      )}
    </div>
  </div>
)

export default QuotesAllSearch