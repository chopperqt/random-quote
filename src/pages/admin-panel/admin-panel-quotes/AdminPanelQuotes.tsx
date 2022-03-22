import React, { useMemo } from 'react'

import Button from 'components/button'
import Spin from 'components/spin'
import Table, { TableAction } from 'components/table'

import { IAdminPanelQuotes } from '../constants'

import styles from './AdminPanelQuotes.module.scss'

const BUTTON_TEXT = 'Создать цитату'

const AdminPanelQuotes = ({
  onOpenAddModal,
}: IAdminPanelQuotes) => {

  const data = React.useMemo(
    () => [
      {
        id: '23',
        quote: 'Цитата 2',
        actions: (
          <TableAction
            onDelete={() => { }}
            onEdit={() => { }}
          />
        )
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

  const columns = React.useMemo(
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
        accessor: 'actions'
      }
    ],
    []
  )

  return (
    <div>
      <Button onClick={onOpenAddModal}>{BUTTON_TEXT}</Button>
      Table 1
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