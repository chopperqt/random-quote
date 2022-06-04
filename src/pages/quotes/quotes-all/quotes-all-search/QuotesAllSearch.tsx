import Grid from 'components/grid'
import { QuoteData } from 'services/quotes'
import Empty from '../empty/Empty'
import Quote from 'components/quote'
import Skeleton from '../partials/Skeleton'
import Information from 'components/Information'
import { DefaultMessage } from 'components/Information'
import Pagination, { PaginationProps } from 'components/pagination'

import styles from './QuotesAllSearch.module.scss'

interface QuotesAllSearchProps extends PaginationProps {
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
  onClick,
  page,
  pages,
}: QuotesAllSearchProps) => (
  <div className={styles.wrap}>
    <div className={styles.section}>
      {isEmpty && (
        <Empty />
      )}
      {isSuccess && (
        <Grid breakpointCols={2} >
          {items.map((quote) => (
            <Quote
              key={quote.id_quote}
              quote={quote}
            />
          ))}
        </Grid>
      )}
      {isLoading && (
        <Skeleton />
      )}
      {isError && (
        <Information text={DefaultMessage.error} />
      )}
      <Pagination
        pages={pages}
        page={page}
        onClick={onClick}
      />
    </div>
  </div>
)

export default QuotesAllSearch