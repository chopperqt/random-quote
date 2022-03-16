import React, { Fragment } from 'react'

interface IIcon {
  icon: JSX.Element
}

const Icon = ({
  icon
}: IIcon) => (
  <Fragment>
    {icon}
  </Fragment>
)

export default Icon