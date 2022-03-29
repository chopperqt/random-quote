import React from 'react'

import { EMPTY_TEXT } from '../../constants'

import styles from './Empty.module.scss'

const Empty = () => (
  <div className={styles.layout}>
    {EMPTY_TEXT}
  </div>
)

export default Empty