import React from 'react'

import Modal from 'components/modal'
import Tabs, { TabItem } from 'components/tabs'
import useModalAdd from './hooks/useModalAdd'
import Input from 'components/input'
import { postQuote } from 'utils/quotes'
import AdminPanelAdd from './admin-panel-add/AdminPanelAdd'

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
    <div>
      <button onClick={handleOpen}>Добавить цитату</button>
      <Tabs
        tabs={MOCK_TABS}
      >
        <TabItem key={MOCK_TABS[0].key}>
          <div>
            Table 1
          </div>
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
        <AdminPanelAdd />
      </Modal>
    </div>
  )
}

export default AdminPanel