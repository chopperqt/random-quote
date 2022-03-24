import React from 'react'
import cx from 'classnames'

import Modal from 'components/modal'
import Tabs, { TabItem } from 'components/tabs'
import useModalAdd from './hooks/useModalAdd'
import AdminPanelAdd from './admin-panel-quotes/add/Add'
import AdminPanelQuotes from './admin-panel-quotes/AdminPanelQuotes'

import styles from './AdminPanel.module.scss'

const TITLE_ADD_MODAL = 'Добавление цитаты'
const MOCK_TABS = [
  {
    key: 3,
    title: 'Цитаты'
  },
  {
    key: 2,
    title: 'Авторы'
  }
]

const AdminPanel = () => {
  const {
    handleClose,
    handleOpen,
    open,
  } = useModalAdd()

  return (
    <div className={styles.adminPanel}>
      <div className={cx("container", styles.wrap)}>
        <Tabs
          tabs={MOCK_TABS}
        >
          <TabItem key={MOCK_TABS[0].key}>
            <AdminPanelQuotes
              onOpenAddModal={handleOpen}
            />
          </TabItem>
          <TabItem key={MOCK_TABS[1].key}>
            <div>
              Table 2
            </div>
          </TabItem>
        </Tabs>
        <Modal
          title={TITLE_ADD_MODAL}
          onClose={handleClose}
          open={open}
        >
          <AdminPanelAdd
            onClose={handleClose}
          />
        </Modal>

      </div>
    </div>
  )
}

export default AdminPanel