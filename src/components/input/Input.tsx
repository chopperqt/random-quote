import React from 'react'
import cx from 'classnames'

import loadingImg from 'templates/loading.gif'
import Icon, { IconList } from 'components/icon'

import styles from './Input.module.scss'

import { IInputProps } from '.'

const LOADING_ALT = 'Loading...'

export const Input = React.forwardRef(({
  className,
  classNameWrap,
  fullWidth,
  label,
  error,
  loading,
  onClear,
  defaultValue,
  ...props
}: IInputProps, ref: any) => (
  <div className={cx(styles.layout, classNameWrap)}>
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
      defaultValue={defaultValue}
      {...props}
    />
    {loading && (
      <img
        className={styles.loading}
        src={loadingImg}
        alt={LOADING_ALT}
      />
    )}
    {onClear && !loading && props.value && props.value.length > 1 && (
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