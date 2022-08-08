import React from 'react'
import cx from 'classnames'

import Icon, { IconList } from 'components/icon'

import styles from './Modal.module.scss'

export interface IModal {
  open: boolean
  children: JSX.Element
  onClose: () => void
  title?: string
}
const Modal = ({
  open = false,
  onClose = () => { },
  children,
  title,
}: IModal) => {
  if (!open) {
    return null
  }

  return (
    <div className={cx(styles.layout, {
      [styles.open]: open
    })}>
      <div className={styles.wrap}>
        {title && (
          <div className={cx(styles.title, "heading--ls text--bold")}>{title}</div>
        )}
        {children}
        <button
          onClick={onClose}
          className={styles.button}
        >
          <Icon icon={IconList.cross} />
        </button>
      </div>

    </div >
  )
}

export default Modal