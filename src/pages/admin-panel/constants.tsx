import { IOption } from 'components/selector'

export interface AdminPanelQuoteProps {
  onOpenAddModal: () => void
  isOpened: boolean
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