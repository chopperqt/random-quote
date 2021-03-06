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
import useAdminPanelQuote from '../hooks/useAdminPanelQuote'

import styles from './AdminPanelQuotes.module.scss'

const BUTTON_TEXT = 'Создать цитату'

const AdminPanelQuotes = ({
  onOpenAddModal,
  isOpened,
}: AdminPanelQuoteProps) => {
  const {
    columns,
    loading,
    formattedData
  } = useAdminPanelQuote()

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