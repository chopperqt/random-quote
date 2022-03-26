import React, { Fragment } from 'react'
import cx from 'classnames'

import styles from './Icon.module.scss'

import { IIcon } from './'

const DEFAULT_VIEWPORT = '0 0 25 25'

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