import React from 'react'

import Button from 'components/button'
import Spin from 'components/spin'
import { IAdminPanelQuotes } from '../constants'

import styles from './AdminPanelQuotes.module.scss'

const BUTTON_TEXT = 'Создать цитату'

const AdminPanelQuotes = ({
  onOpenAddModal,
}: IAdminPanelQuotes) => {
  return (
    <div>
      <Button onClick={onOpenAddModal}>{BUTTON_TEXT}</Button>
      Table 1
      <Spin loading={true}>
        <div className={styles.test}>

        </div>
      </Spin>

    </div>
  )
}

export default AdminPanelQuotes