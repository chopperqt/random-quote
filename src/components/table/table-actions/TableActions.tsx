import React from 'react'

import Button from 'components/button'
import Icon, { IconList } from 'components/icon'

import { TableActionsProps } from '../'

import styles from './TableActions.module.scss'

const TableAction = ({
  onDelete,
  editElement,
}: TableActionsProps) => (
  <div className={styles.wrap}>
    {editElement}
    <Button
      className={styles.button}
      onClick={onDelete}
      color="warning"
    >
      <Icon icon={IconList.trash} />
    </Button>
  </div>
)

export default TableAction