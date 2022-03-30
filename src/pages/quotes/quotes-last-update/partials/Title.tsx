import React, { memo } from 'react'

import {
  LAST_UPDATE_QUOTES_TEXT,

} from '../../constants'

import styles from '../QuotesLastUpdate.module.scss'

interface ITitleProps {
  description: string
}

const Title = ({
  description
}: ITitleProps) => (
  <>
    <div className="heading--lx text--bold">
      {LAST_UPDATE_QUOTES_TEXT}
    </div>
    <div className={styles.description}>
      {description}
    </div>
  </>
)

export default memo(Title)