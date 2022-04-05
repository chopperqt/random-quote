import React from 'react'

import { SEARCH_EMPTY_TEXT } from '../constants'

import styles from './Empty.module.scss'

const Empty = () => (
  <div className={styles.empty}>
    {SEARCH_EMPTY_TEXT}
  </div>
)

export default Empty

