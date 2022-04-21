import React from 'react'

import { ALL_QUOTES_TEXT } from '../../constants'

import styles from '../QuotesAll.module.scss'

interface ITitleProps {
  text: string
}

const Title = ({
  text
}: ITitleProps) => {
  return (
    <div className={styles.title}>
      <div className="heading--lx text--bold">
        {ALL_QUOTES_TEXT}
      </div>
      <div className={styles.description}>
        {text}
      </div>
    </div>
  )
}

export default Title