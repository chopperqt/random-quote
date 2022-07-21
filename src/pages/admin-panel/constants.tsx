import { IOption } from 'components/selector'

export interface AdminPanelQuoteProps {
  onOpenAddModal: () => void
  onOpenEdit: () => void
  isOpened: boolean
  isOpenedEdit: boolean
}

export interface AdminPanelModal {
  onClose?: () => void
  isOpened: boolean
}

export interface IAdminPanelAddField {
  date: string
  quote: string
  author: IOption
}