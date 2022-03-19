import React from 'react'
import cx from 'classnames'

import styles from './Input.module.scss'

interface IInput extends React.ComponentProps<'input'> {
  className?: string
  fullWidth?: boolean
  label?: string
  error?: string
}
const Input = ({
  className,
  fullWidth,
  label,
  error,
  ...props
}: IInput) => {
  return (
    <div className={styles.layout}>
      {label && (
        <label className={cx(styles.label, {
          'label--error': !!error,
        })}>{label}</label>
      )}
      <input
        className={cx(styles.input, className, {
          'input--full': fullWidth,
          'input--error': !!error,
        })}
        {...props}
      />
      {error && (
        <span className={cx('heading--sm', styles.error)}>{error}</span>
      )}
    </div>
  )
}

export default Input