import React from 'react'
import cx from 'classnames'

import loadingImg from 'templates/loading.gif'

import styles from './Input.module.scss'

interface IInput extends React.ComponentProps<'input'> {
  className?: string
  fullWidth?: boolean
  label?: string
  error?: string
  loading?: boolean
}
const Input = React.forwardRef(({
  className,
  fullWidth,
  label,
  error,
  loading,
  ...props
}: IInput, ref: any) => (
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
      ref={ref}
      {...props}
    />
    {loading && (
      <img
        className={styles.loading}
        src={loadingImg}
        alt="Loading..."

      />
    )}
    {error && (
      <span className={cx('heading--sm', styles.error)}>{error}</span>
    )}
  </div>
))

export default Input