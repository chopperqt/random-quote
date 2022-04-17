import React, { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'

import Button from 'components/button'
import Spin from 'components/spin'
import Table, { TableAction } from 'components/table'
import Icon, { IconList } from 'components/icon'
import { getQuotes } from 'utils/quotes'

import { IStore } from 'services'
import { IAdminPanelQuotes } from '../constants'

import styles from './AdminPanelQuotes.module.scss'

const BUTTON_TEXT = 'Создать цитату'

const AdminPanelQuotes = ({
  onOpenAddModal,
}: IAdminPanelQuotes) => {
  const hasLoading = useSelector((store: IStore) => store.notificationsStore.loading?.getQuotes)
  const quotes = useSelector((store: IStore) => store.quotesStore.quotes)

  const modifyActionsQuotes = quotes.map((quote) => ({
    ...quote,
    author: quote.name || '',
    actions: (
      <TableAction
        onDelete={() => { }}
        onEdit={() => { }}
      />
    )
  }))

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id_quote',
      },
      {
        Header: 'Quote',
        accessor: 'text',
        width: 600,
      },
      {
        Header: 'Author',
        accessor: 'author',
      },
      {
        Header: 'Create At',
        accessor: 'created_at',
      },
      {
        Header: 'Actions',
        accessor: 'actions',
      }
    ],
    []
  )

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
      <Spin loading={hasLoading === 'PENDING'}>
        <Table
          data={modifyActionsQuotes}
          columns={columns}
        />
      </Spin>

    </div>
  )
}

export default AdminPanelQuotes