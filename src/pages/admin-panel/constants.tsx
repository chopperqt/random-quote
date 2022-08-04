import { Option } from 'components/selector'

export interface AdminPanelQuoteProps {
  onOpenAddModal: () => void
}

export interface AdminPanelModal {
  onClose?: () => void
  isOpened: boolean
}

export interface IAdminPanelAddField {
  text: string
  author: Option
}