import cx from 'classnames'

import Modal from 'components/modal'
import Tabs, { TabItem } from 'components/tabs'
import useModalAdd from './hooks/useModalAdd'
import AdminPanelAdd from './admin-panel-quotes/add/Add'
import AdminPanelQuotes from './admin-panel-quotes/AdminPanelQuotes'
import AdminPanelAuthors from './admin-panel-author/AdminPanelAuthors'
import AdminPanelApplications from './admin-panel-applications/AdminPanelApplications'

import styles from './AdminPanel.module.scss'
import { useEdit } from './admin-panel-quotes/hooks/useEdit'

const TITLE_ADD_MODAL = 'Добавление цитаты'
const MOCK_TABS = [
  {
    key: 0,
    title: 'Цитаты'
  },
  {
    key: 1,
    title: 'Авторы',
  },
  {
    key: 2,
    title: 'Заявки',
  },
]

const AdminPanel = () => {
  const {
    handleClose,
    handleOpen,
    open,
  } = useModalAdd()

  const {
    isOpened,
    open: onOpen,
    close: onClose,
  } = useEdit()

  return (
    <div className={styles.adminPanel}>
      <div className={cx("container", styles.wrap)}>
        <Tabs
          tabs={MOCK_TABS}
        >
          <TabItem key={MOCK_TABS[0].key}>
            <AdminPanelQuotes
              isOpenedEdit={isOpened}
              onOpenEdit={onOpen}
              isOpened={open}
              onOpenAddModal={handleOpen}
            />
          </TabItem>
          <TabItem key={MOCK_TABS[1].key}>
            <AdminPanelAuthors />
          </TabItem>
          <TabItem key={MOCK_TABS[2].key}>
            <AdminPanelApplications />
          </TabItem>
        </Tabs>
        <Modal
          title={TITLE_ADD_MODAL}
          onClose={handleClose}
          open={open}
        >
          <AdminPanelAdd
            isOpened={open}
            onClose={handleClose}
          />
        </Modal>
      </div>
    </div>
  )
}

export default AdminPanel