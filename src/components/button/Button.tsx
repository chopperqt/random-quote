import React from 'react'
import cx from 'classnames'

import loadingGif from 'templates/loading.gif'
import useButton from './hooks/useButton'

import {
  IButton,
} from './'

import styles from './Button.module.scss'

const LOADING_ALT = 'Loading...'



const Button = ({
  className,
  children,
  loading = false,
  color = 'primary',
  ...props
}: IButton) => {
  const {
    hasLoaderVisible
  } = useButton({
    loading
  })

  return (
    <button
      {...props}
      disabled={props.disabled || hasLoaderVisible}
      className={cx(
        styles.button,
        'heading--md',
        `button-color--${color}`,
        className
      )}
    >
      {hasLoaderVisible && (
        <img
          src={loadingGif}
          alt={LOADING_ALT}
          className={styles.loader}
        />
      )}
      {children}
    </button>
  )
}

export default Button