import React from 'react'
import cx from 'classnames'

import DefaultProps from 'helpers/defaultProps'

import { TextareaProps } from './'

import styles from './Textarea.module.scss'

const Textarea = ({
  className,
  classNameWrap,
  fullWidth = false,
  label,
  error,
  loading = false,
  value,
  onClear = DefaultProps.function,
  ...props
}: TextareaProps) => (
  <div className={cx(classNameWrap)}>
    <div>
      {label}
      <span className={styles.requited}>
        *
      </span>
    </div>
    <textarea
      className={cx(styles.textarea, className)}
      {...props}

    />
    {!!error && (
      <div className={styles.error}>
        {error}
      </div>
    )}
  </div>

)

export default Textarea