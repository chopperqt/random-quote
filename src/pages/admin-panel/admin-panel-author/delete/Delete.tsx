import { TableDelete } from 'components/table'
import { AuthorID, AuthorImage } from 'models/author.type'
import { useState } from 'react'
import { Stores } from 'services'
import { deleteAuthor, getAuthors } from 'utils/authors'
import getNormalizedAvatar from '../helpers/getNormalizedAvatar'

interface DeleteProps {
  authorID: AuthorID
  authorImage: AuthorImage
}

const Delete = ({
  authorID,
  authorImage
}: DeleteProps) => {
  const {
    NotificationStore: {
      loading: {
        deleteAuthor: loading,
      }
    }
  } = Stores()

  const isLoading = loading?.status === 'PENDING'

  const [opened, setOpened] = useState<boolean>(false)

  const close = () => {
    setOpened(false)
  }

  const open = () => {
    setOpened(true)
  }

  const handleDelete = async () => {
    const formattedImage = getNormalizedAvatar(authorImage)

    const deletedResponse = await deleteAuthor(authorID, formattedImage)

    if (!deletedResponse) {
      return
    }

    getAuthors()

    close()
  }

  return (
    <TableDelete
      isLoading={isLoading}
      opened={opened}
      onOpen={open}
      onClose={close}
      onClick={handleDelete}
    />
  )
}

export default Delete