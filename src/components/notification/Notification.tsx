import React from 'react'
import cx from 'classnames'

import Icon, { IconList } from 'components/icon'

import styles from './Notification.module.scss'
import useNotification from './hooks/useNotification'

interface INotifications {
  text: string,
  id: string
  type: TNotification
}

export type TNotification = 'SUCCESS' | 'ERROR'

const Notification = ({
  text,
  id,
  type,
}: INotifications) => {
  const {
    visibility
  } = useNotification()

  return (
    <div className={cx(
      styles.notification,
      `notification-${type.toLowerCase()}`,
      `notification-${visibility}`
    )}>
      {text}
      <button
        className={styles.button}
      >
        <Icon icon={IconList.cross} />
      </button>

    </div>
  )
}

export default Notification