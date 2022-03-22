import React, { Fragment } from 'react'
import cx from 'classnames'

import styles from './Icon.module.scss'

interface IIcon {
  icon: JSX.Element
}

const Icon = ({
  icon
}: IIcon) => (
  <Fragment>
    <svg
      className={cx(styles.icon, 'icon-svg')}
      viewBox='0 0 25 25'
    >
      {icon}
    </svg>

  </Fragment>
)

export default Icon