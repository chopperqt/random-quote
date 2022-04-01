import React from 'react'
import cx from 'classnames'

import { ICollapseProps } from './'
import Icon, { IconList } from 'components/icon'
import DefaultProps from 'helpers/defaultProps'
import useCollapse from './hooks/useCollapse'

import styles from './Collapse.module.scss'

const Collapse = ({
  text,
  children,
  open = false,
  onClose = DefaultProps.function,
  onOpen = DefaultProps.function,
}: ICollapseProps) => {
  const {
    handleClick
  } = useCollapse({
    onClose,
    onOpen,
    open
  })

  return (
    <div>
      <div
        className={styles.text}
        onClick={handleClick}
      >
        {text}
        {!open && (
          <Icon icon={IconList.chevronDown} />
        )}
        {open && (
          <Icon icon={IconList.chevronUp} />
        )}
      </div>
      {open && (
        <>
          {children}
        </>
      )}
    </div>
  )
}

export default Collapse