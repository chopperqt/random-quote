import React from 'react'
import cx from 'classnames'

import Spin from 'components/spin'
import Icon, { IconList } from 'components/icon'

import styles from './Likes.module.scss'

import { ILikesProps } from '../'

const Likes = ({
  onClickLike,
  onClickDislike,
  loading = false,
  count = 0,
  disableDislike,
  disableLike,
}: ILikesProps) => (
  <div className={styles.sectionLike}>
    <button
      disabled={loading || disableLike}
      className={cx(styles.button, styles.buttonLike)}
      onClick={onClickLike}
    >
      <Icon icon={IconList.chevronUp} />
    </button>
    <div>
      <Spin
        className={styles.loadingWrap}
        classNameSpin={styles.loading}
        loading={loading}
      >
        <div className={styles.loading}>
          {count}
        </div>
      </Spin>
    </div>
    <button
      disabled={loading || disableDislike}
      onClick={onClickDislike}
      className={styles.button}
    >
      <Icon icon={IconList.chevronDown} />
    </button>
  </div>
)

export default Likes