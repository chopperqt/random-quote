import Masonry, { MasonryProps } from 'react-masonry-css'
import cx from 'classnames'

import styles from './Grid.module.scss'

type FilterMasonryProps = Pick<MasonryProps, 'columnClassName' | 'breakpointCols'>

interface GridProps extends FilterMasonryProps {
  children: JSX.Element | JSX.Element[]
  className?: string
}
const Grid = ({
  children,
  ...props
}: GridProps) => (
  <Masonry
    {...props}
    className={cx(styles.grid, props.className)}
    columnClassName={cx(styles.column, props.columnClassName)}
  >
    {children}
  </Masonry>
)

export default Grid