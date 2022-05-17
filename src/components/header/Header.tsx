import Tooltip from 'components/tooltip'
import Icon, { IconList } from 'components/icon'
import Link from 'components/link'
import {
  MenuList,
  PROFILE_TEXT,
  LOGIN_TEXT,
} from './constants'
import { routes } from 'helpers/routes'
import useUser from 'helpers/useUser'

import styles from './Header.module.scss'

const Header = () => {
  const { user } = useUser()
  const defaultOptions = {
    className: styles.link,
    activeLink: "active-menu-item",
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {MenuList.map(({ icon, path, text }) => (
          <Tooltip
            position='top'
            key={path}
            text={text}
          >
            <Link
              alt={text}
              to={path}
              {...defaultOptions}
            >
              <Icon icon={icon} />
            </Link>
          </Tooltip>
        ))}
        {user && (
          <Tooltip
            position="top"
            text={PROFILE_TEXT}
          >
            <Link
              alt={PROFILE_TEXT}
              to={routes.profile}
              {...defaultOptions}
            >
              <Icon icon={IconList.user} />
            </Link>
          </Tooltip>
        )}
        {!user && (
          <Tooltip
            position="top"
            text={LOGIN_TEXT}
          >
            <Link
              alt={LOGIN_TEXT}
              to={routes.logIn}
              {...defaultOptions}
            >
              <Icon icon={IconList.login} />
            </Link>
          </Tooltip>
        )}

      </div>
    </header>
  )
}

export default Header