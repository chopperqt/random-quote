export interface ITable {
  columns: IColumn[]
  data: any
}

export interface IColumn {
  Header: string
  accessor: string
}