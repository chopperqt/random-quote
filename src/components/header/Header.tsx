import React from 'react'

import useUser from 'helpers/useUser'

import styles from './Header.module.scss'

const Header = () => {
  const {
    hasUser,
    user
  } = useUser()

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {hasUser && (
          <img src={user?.avatar_url} alt={user?.email} />
        )}
        {!hasUser && (
          <button>Войти</button>
        )}
      </div>
    </header>
  )
}

export default Header