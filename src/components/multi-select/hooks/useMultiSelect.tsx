import { useState } from "react"

export const useMultiSelect = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false)

  const handleOpen = () => {
    setIsOpened(true)
  }

  const handleClose = () => {
    setIsOpened(false)
  }

  return {
    isOpened,
    handleClose,
    handleOpen,
  }
}

