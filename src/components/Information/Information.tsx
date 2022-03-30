import React from 'react'
import cx from 'classnames'

import styles from './Information.module.scss'

import { IInformationProps } from '.'

const Information = ({
  className = '',
  text
}: IInformationProps) => (
  <div className={cx(styles.message, className)}>
    {text}
  </div>
)

export default Information