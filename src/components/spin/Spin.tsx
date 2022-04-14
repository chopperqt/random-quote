import React from 'react'
import cx from 'classnames'

import loadingImg from 'templates/loading.gif'

import { ISpin } from './constants'

import styles from './Spin.module.scss'

const Spin = ({
  children,
  loading,
  className,
}: ISpin) => (
  <div className={styles.layout}>
    {loading && (
      <div className={cx(styles.wrap, className)}>
        <img
          src={loadingImg}
          alt="Loading..."
          className={styles.spin}
        />
      </div>
    )}
    {children}
  </div>
)

export default Spin