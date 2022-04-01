import React, { useEffect } from 'react'

import DefaultProps from 'helpers/defaultProps'

interface IUseCollapse {
  onClose: () => void
  onOpen: () => void
  open: boolean
}

const useCollapse = ({
  onClose = DefaultProps.function,
  onOpen = DefaultProps.function,
  open = false,
}: IUseCollapse) => {
  const handleClick = () => {
    if (open) {
      onClose()

      return
    }

    onOpen()
  }

  return {
    handleClick
  }
}

export default useCollapse