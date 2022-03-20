import React from 'react'

import Button from 'components/button'

const BUTTON_TEXT = 'Создать цитату'

interface IAdminPanelQuotes {
  onOpenAddModal: () => void
}
const AdminPanelQuotes = ({
  onOpenAddModal,
}: IAdminPanelQuotes) => {
  return (
    <div>
      <Button onClick={onOpenAddModal}>{BUTTON_TEXT}</Button>
      Table 1
    </div>
  )
}

export default AdminPanelQuotes