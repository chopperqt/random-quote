import React, { ReactPropTypes } from 'react'
import cx from 'classnames'

import styles from './Button.module.scss'

export interface IButton extends React.ComponentProps<'button'> {
  className?: string
  children?: JSX.Element | string
}

const Button = ({
  className,
  children,
  ...props
}: IButton) => {
  return (
    <button
      {...props}
      className={cx(styles.button, 'heading--ls', className)}
    >
      {children}
    </button>
  )
}

export default Button