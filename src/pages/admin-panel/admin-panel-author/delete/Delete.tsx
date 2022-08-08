import { TableDelete } from 'components/table'
import { useState } from 'react'
import { deleteFile } from 'utils/upload'

const Delete = () => {
  const [opened, setOpened] = useState<boolean>(false)

  const close = () => {
    setOpened(false)
  }

  const open = () => [
    setOpened(true)
  ]

  const handleDelete = () => {
    deleteFile()
    console.log('Удаление')
  }

  return (
    <TableDelete
      opened={opened}
      onOpen={open}
      onClose={close}
      onClick={handleDelete}
    />
  )
}

export default Delete