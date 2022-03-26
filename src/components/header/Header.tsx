import React from 'react'
import cx from 'classnames'

import useUser from 'helpers/useUser'
import Tooltip from 'components/tooltip'
import { MenuList } from './constants'
import Icon from 'components/icon'
import Link from 'components/link'

import styles from './Header.module.scss'

const Header = () => {
  const {
    hasUser,
    user,
  } = useUser()

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {MenuList.map(({ icon, path, text }) => {
          return (
            <Tooltip
              text={text}
            >
              <Link
                to={path}
                className={styles.link}
                activeLink="active-menu-item"
              >
                <Icon icon={icon} />
              </Link>
            </Tooltip>
          )
        })}
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