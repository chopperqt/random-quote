import React, { useMemo } from 'react'

import Button from 'components/button'
import Spin from 'components/spin'
import Table, { TableAction } from 'components/table'
import Icon, { IconList } from 'components/icon'

import { IAdminPanelQuotes } from '../constants'

import styles from './AdminPanelQuotes.module.scss'

const BUTTON_TEXT = 'Создать цитату'

const AdminPanelQuotes = ({
  onOpenAddModal,
}: IAdminPanelQuotes) => {

  const data = useMemo(
    () => [
      {
        id: '23',
        quote: 'Цитата 2',
        actions: (
          <TableAction
            onDelete={() => { }}
            onEdit={() => { }}
          />
        ),
      },
      {
        id: '43',
        quote: 'Цитата1',
      },
      {
        id: '31',
        quote: 'Цитата 3',
      },
    ],
    []
  )

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Цитата',
        accessor: 'quote',
      },
      {
        Header: 'Действия',
        accessor: 'actions',
      }
    ],
    []
  )

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
      <Spin loading={false}>
        <Table
          data={data}
          columns={columns}
        />
      </Spin>

    </div>
  )
}

export default AdminPanelQuotes