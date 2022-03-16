import React, { useState } from 'react'

const useModalAdd = () => {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return {
    open,
    handleClose,
    handleOpen,
  }
}

export default useModalAdd