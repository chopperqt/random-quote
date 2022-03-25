import React from 'react'

import useUser from 'helpers/useUser'
import Icon, { IconList } from 'components/icon'
import Tooltip from 'components/tooltip'

import styles from './Header.module.scss'

const Header = () => {
  const {
    hasUser,
    user,
  } = useUser()

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Tooltip>
          <button className={styles.button}>
            <Icon icon={IconList.quote} />
          </button>
        </Tooltip>


        <button className={styles.button}>
          <Icon icon={IconList.author} />
        </button>


        {/* {hasUser && (
          <img src={user?.avatar_url} alt={user?.email} />
        )}
        {!hasUser && (
          <button>Войти</button>
        )} */}
      </div>
    </header>
  )
}

export default Header