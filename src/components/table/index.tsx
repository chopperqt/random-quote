import Table from './Table'
import TableAction from './table-actions/TableActions'

export interface ITable {
  columns: IColumn[]
  data: any
}

export interface IColumn {
  Header: string
  accessor: string
}

export interface ITableActions {
  onEdit: () => void
  onDelete: () => void
}

export {
  TableAction
}

export default Table 