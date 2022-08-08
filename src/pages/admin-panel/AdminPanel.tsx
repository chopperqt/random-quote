import cx from 'classnames'

import Modal from 'components/modal'
import Tabs, { Tab } from 'components/tabs'
import useModalAdd from './hooks/useModalAdd'
import AdminPanelAdd from './admin-panel-quotes/add/Add'
import AdminPanelQuotes from './admin-panel-quotes/AdminPanelQuotes'
import AdminPanelAuthors from './admin-panel-author/AdminPanelAuthors'
import AdminPanelApplications from './admin-panel-applications/AdminPanelApplications'
import { getUrlParam, updateUrlParams } from 'helpers/urlParams'

import styles from './AdminPanel.module.scss'

const TITLE_ADD_MODAL = 'Добавление цитаты'
const MOCK_TABS = [
  {
    key: 1,
    title: 'Цитаты'
  },
  {
    key: 2,
    title: 'Авторы',
  },
  {
    key: 3,
    title: 'Заявки',
  },
]

const AdminPanel = () => {
  const initialTab = getUrlParam('tab') || MOCK_TABS[0].key
  const {
    handleClose,
    handleOpen,
    open,
  } = useModalAdd()

  const handleChangeTab = (tab: string | number) => {
    updateUrlParams({ tab })
  }

  return (
    <div className={styles.adminPanel}>
      <div className={cx("container", styles.wrap)}>
        <Tabs
          tabs={MOCK_TABS}
          onChange={(key) => handleChangeTab(key)}
          initialTab={+initialTab}
        >
          <Tab key={MOCK_TABS[0].key}>
            <AdminPanelQuotes onOpenAddModal={handleOpen} />
          </Tab>
          <Tab key={MOCK_TABS[1].key}>
            <AdminPanelAuthors />
          </Tab>
          <Tab key={MOCK_TABS[2].key}>
            <AdminPanelApplications />
          </Tab>
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