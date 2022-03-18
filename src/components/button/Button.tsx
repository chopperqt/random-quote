import React from 'react'
import cx from 'classnames'

import loadingGif from 'templates/loading.gif'
import useButton from './hooks/useButton'

import styles from './Button.module.scss'

const LOADING_ALT = 'Loading...'

export interface IButton extends React.ComponentProps<'button'> {
  className?: string
  loading?: boolean
  children?: JSX.Element | string

}

const Button = ({
  className,
  children,
  loading = false,
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
      className={cx(styles.button, 'heading--ls', className)}
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