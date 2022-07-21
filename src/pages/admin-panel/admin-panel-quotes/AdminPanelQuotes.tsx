import {
  useEffect,
  useMemo,
} from 'react'

import Button from 'components/button'
import Spin from 'components/spin'
import Table from 'components/table'
import Icon, { IconList } from 'components/icon'
import { getQuotes } from 'utils/quotes'
import { AdminPanelQuoteProps } from '../constants'

import styles from './AdminPanelQuotes.module.scss'
import useAdminPanelQuote from '../hooks/useAdminPanelQuote'

const BUTTON_TEXT = 'Создать цитату'

const AdminPanelQuotes = ({
  onOpenAddModal,
  isOpened,
  isOpenedEdit,
  onOpenEdit,
}: AdminPanelQuoteProps) => {
  const {
    columns,
    loading,
    formattedData
  } = useAdminPanelQuote({
    onOpenEdit,
    isOpenedEdit,
  })

  useEffect(() => {
    getQuotes({})
  }, [])

  return (
    <div className={styles.layout}>
      <Button
        onClick={onOpenAddModal}
        className={styles.button}
      >
        <>
          <Icon icon={IconList.save} />
          {BUTTON_TEXT}
        </>
      </Button>
      <Spin loading={loading?.status === 'PENDING'}>
        <Table
          data={formattedData}
          columns={columns}
        />
      </Spin>
    </div>
  )
}

export default AdminPanelQuotes