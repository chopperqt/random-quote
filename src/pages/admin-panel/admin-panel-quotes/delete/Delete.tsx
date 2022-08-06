import { useState } from 'react'

import { TableDelete } from "components/table"
import { QuoteID } from "models/quotes.type"
import { deleteQuote } from 'utils/quotes'

interface DeleteProps {
  quoteID: QuoteID
  isLoading: boolean
}
const Delete = ({
  quoteID,
  isLoading = false,
}: DeleteProps) => {
  const [opened, setOpened] = useState<boolean>(false)

  const close = () => {
    setOpened(false)
  }

  const open = () => {
    setOpened(true)
  }

  const handleClick = async () => {
    const response = await deleteQuote(quoteID)

    if (!response) {
      return
    }

    close()
  }

  return (
    <TableDelete
      onClose={close}
      onOpen={open}
      isLoading={isLoading}
      opened={opened}
      onClick={handleClick}
    />
  )
}

export default Delete