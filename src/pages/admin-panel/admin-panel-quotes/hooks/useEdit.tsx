import { useState } from 'react'

export const useEdit = () => {
  const [isOpened, setOpened] = useState(false)

  const open = () => {
    setOpened(true)
  }

  const close = () => {
    setOpened(false)
  }

  return {
    open,
    close,
    isOpened,
  }
}