import React from 'react'

import Button from 'components/button'
import Icon, { IconList } from 'components/icon'

import { ITableActions } from '../'

import styles from './TableActions.module.scss'

const TableAction = ({
  onDelete,
  onEdit
}: ITableActions) => (
  <div className={styles.wrap}>
    <Button
      className={styles.button}
      onClick={onEdit}
    >
      <Icon icon={IconList.edit} />
    </Button>
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