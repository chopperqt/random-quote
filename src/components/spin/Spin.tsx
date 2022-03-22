import React from 'react'

import loadingImg from 'templates/loading.gif'

import { ISpin } from './constants'

import styles from './Spin.module.scss'

const Spin = ({
  children,
  loading,
}: ISpin) => (
  <div className={styles.layout}>
    {loading && (
      <div className={styles.wrap}>
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