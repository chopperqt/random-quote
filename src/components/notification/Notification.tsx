import React from 'react'
import cx from 'classnames'

import Icon, { IconList } from 'components/icon'

import styles from './Notification.module.scss'
import useNotification from './hooks/useNotification'

interface NotificationsProps {
  text: string,
  id: string
  type: NotificationType
}

export type NotificationType = 'SUCCESS' | 'ERROR'

const Notification = ({
  text,
  id,
  type,
}: NotificationsProps) => {
  const {
    visibility,
    handleHide,
  } = useNotification()

  return (
    <div className={cx(
      styles.notification,
      `notification-${type.toLowerCase()}`,
      `notification-${visibility}`
    )}>
      {text}
      <button
        onClick={handleHide}
        className={styles.button}
      >
        <Icon icon={IconList.cross} />
      </button>

    </div>
  )
}

export default Notification