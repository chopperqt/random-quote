import Table from './Table'
import TableAction from './table-actions/TableActions'
import TableAuthor from './table-author/TableAuthor'
import TableDelete from './table-delete/TableDelete'

export interface ITable {
  columns: IColumn[]
  data: any
}

export interface IColumn {
  Header: string
  accessor: string
}

export interface TableActionsProps {
  deleteElement?: JSX.Element | JSX.Element[]
  editElement?: JSX.Element | JSX.Element[]
}

export {
  TableAction,
  TableAuthor,
  TableDelete,
}

export default Table 