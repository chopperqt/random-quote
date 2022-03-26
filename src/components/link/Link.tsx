import React from 'react'
import { NavLink } from 'react-router-dom'
import cx from 'classnames'
import { useResolvedPath, useMatch } from 'react-router-dom'

import styles from './Link.module.scss'

import { ILink } from './'

const Link = ({
  children,
  to,
  className,
  activeLink = '',
}: ILink) => {
  const resolved = useResolvedPath(to)
  const match = useMatch({ path: resolved.pathname, end: true })

  return (
    <NavLink
      className={cx(styles.link, className, {
        [activeLink]: match
      })}
      to={to}
    >
      {children}
    </NavLink>
  )
}

export default Link