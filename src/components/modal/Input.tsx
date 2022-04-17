import React from 'react'
import cx from 'classnames'

import loadingImg from 'templates/loading.gif'
import Icon, { IconList } from 'components/icon'

import styles from './Input.module.scss'

import { IInputProps } from './'

export const Input = React.forwardRef(({
  className,
  fullWidth,
  label,
  error,
  loading,
  value,
  onClear,
  ...props
}: IInputProps, ref: any) => (
  <div className={styles.layout}>
    {label && (
      <label className={cx(styles.label, {
        'label--error': !!error,
      })}>{label}</label>
    )}
    <input
      value={value}
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
    {onClear && !loading && value && value.length > 1 && (
      <button
        onClick={onClear}
        className={cx(styles.loading, styles.clear)}>
        <Icon icon={IconList.cross} />
      </button>
    )}
    {error && (
      <span className={cx('heading--sm', styles.error)}>{error}</span>
    )}
  </div>
))