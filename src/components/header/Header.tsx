import Tooltip from 'components/tooltip'
import { MenuList } from './constants'
import Icon from 'components/icon'
import Link from 'components/link'

import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {MenuList.map(({ icon, path, text }) => {
          return (
            <Tooltip
              key={path}
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
      </div>
    </header>
  )
}

export default Header