import cx from 'classnames'

import Icon, { IconList } from "components/icon"
import useBookmark from '../hooks/useBookmark'
import Spin from 'components/spin'
import Tooltip from 'components/tooltip'
import {
  BOOKMARKED,
  ADD_BOOKMARK,
} from './constants'

import styles from './Bookmark.module.scss'

interface IBookmarkProps {
  id: number
  bookmarked: boolean
}

const Bookmark = ({
  id,
  bookmarked = false,
}: IBookmarkProps) => {
  const tooltipText = bookmarked ? BOOKMARKED : ADD_BOOKMARK
  const {
    handleClickBookmark,
    loading,
  } = useBookmark({
    id,
    bookmarked
  })

  return (
    <Tooltip text={tooltipText}>
      <button
        className={cx(styles.bookmark, {
          'bookmark-active': bookmarked,
        })}
        onClick={handleClickBookmark}
      >
        <Spin
          className={styles.spinWrap}
          classNameSpin={styles.spin}
          loading={loading}
        >
          <Icon icon={IconList.bookmark} />
        </Spin>
      </button>

    </Tooltip>
  )
}

export default Bookmark