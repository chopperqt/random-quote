import Table from './Table'
import TableAction from './table-actions/TableActions'
import TableAuthor from './table-author/TableAuthor'

export interface ITable {
  columns: IColumn[]
  data: any
}

export interface IColumn {
  Header: string
  accessor: string
}

export interface TableActionsProps {
  onDelete: () => void
  editElement: JSX.Element | JSX.Element[]
}

export {
  TableAction,
  TableAuthor,
}

export default Table 