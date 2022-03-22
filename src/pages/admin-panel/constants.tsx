export interface IAdminPanelQuotes {
  onOpenAddModal: () => void
}

export interface IAdminPanelAdd {
  onClose?: () => void
}

export interface IAdminPanelAddField {
  date: string
  quote: string
}