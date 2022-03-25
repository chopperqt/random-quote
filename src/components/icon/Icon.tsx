import React, { Fragment } from 'react'
import cx from 'classnames'

import styles from './Icon.module.scss'

const DEFAULT_VIEWPORT = '0 0 25 25'

interface IIcon {
  icon: IIconItem
}

interface IIconItem {
  icon: JSX.Element
  viewport?: string
}

const Icon = ({
  icon
}: IIcon) => {
  const customViewport = icon?.viewport || DEFAULT_VIEWPORT

  return (
    <Fragment>
      <svg
        className={cx(styles.icon, 'icon-svg')}
        viewBox={customViewport}
      >
        {icon.icon}
      </svg>

    </Fragment>
  )
}

export default Icon