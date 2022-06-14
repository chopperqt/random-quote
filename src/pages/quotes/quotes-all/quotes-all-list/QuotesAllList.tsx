import Masonry from 'react-masonry-css'

import { QuoteData } from 'services/quotes/QuotesStore'
import Empty from '../empty/Empty'
import Quote from 'components/quote'
import Skeleton from '../partials/Skeleton'
import Information from 'components/Information'
import { DefaultMessage } from 'components/Information'
import Pagination, { PaginationProps } from 'components/pagination'
import Grid from 'components/grid'


import styles from './QuotesAllList.module.scss'

interface QuotesAllSearchProps extends PaginationProps {
  isEmpty: boolean
  isSuccess: boolean
  isLoading: boolean
  isError: boolean
  items: QuoteData[]
}
const QuotesAllList = ({
  isEmpty,
  isSuccess,
  items,
  isLoading,
  isError,
  page,
  pages,
  onClick,
}: QuotesAllSearchProps) => (
  <div className={styles.section}>
    {isEmpty && (
      <Empty />
    )}
    {isSuccess && (
      <Grid
        breakpointCols={2}
        columnClassName={styles.grid}
      >
        {items.map(({
          name,
          text,
          path,
          created_at,
          id_author,
          id_quote,
          data,
        }) => (
          <Quote
            key={id_quote}
            id_author={id_author}
            id_quote={id_quote}
            name={name}
            path={path}
            text={text}
            created_at={created_at}
            data={data}
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
)

export default QuotesAllList