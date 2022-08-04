import { useEffect } from 'react'

import Button from 'components/button'
import Spin from 'components/spin'
import Table from 'components/table'
import Icon, { IconList } from 'components/icon'
import { getQuotes } from 'utils/quotes'
import { AdminPanelQuoteProps } from '../constants'
import useAdminPanelQuote from '../hooks/useAdminPanelQuote'

import styles from './AdminPanelQuotes.module.scss'
import Pagination from 'components/pagination'

const BUTTON_TEXT = 'Добавить цитату'

const AdminPanelQuotes = ({ onOpenAddModal }: AdminPanelQuoteProps) => {
  const {
    columns,
    loading,
    formattedData,
    currentPage,
    pages,
  } = useAdminPanelQuote()

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
      <Pagination
        page={currentPage}
        pages={pages}
        onClick={() => { }}
      />
    </div>
  )
}

export default AdminPanelQuotes