import React from 'react'

import { TableActionsProps } from '../'

import styles from './TableActions.module.scss'

const TableAction = ({
  deleteElement,
  editElement,
}: TableActionsProps) => (
  <div className={styles.wrap}>
    {editElement}
    {deleteElement}
  </div>
)

export default TableAction