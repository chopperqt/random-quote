import React, { Fragment } from 'react'
import cx from 'classnames'

import styles from './Input.module.scss'

interface IInput extends React.ComponentProps<'input'> {
  className?: string
  fullWidth?: boolean
  label?: string
}
const Input = ({
  className,
  fullWidth,
  label,
  ...props
}: IInput) => {
  return (
    <div className={styles.layout}>
      {label && (
        <label>{label}</label>
      )}
      <input
        className={cx(styles.input, className, {
          'input--full': fullWidth
        })}
        {...props}
      />
    </div>
  )
}

export default Input