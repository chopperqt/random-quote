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
import AuthModal from 'components/AuthModal'

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
    handleClose,
    opened,
    loading,
  } = useBookmark({
    id,
    bookmarked
  })

  return (
    <>
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
      <AuthModal
        onClose={handleClose}
        opened={opened}
      />
    </>
  )
}

export default Bookmark