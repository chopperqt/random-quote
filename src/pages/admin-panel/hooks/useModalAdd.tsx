import { useState } from 'react'
import { Stores } from 'services'

const useModalAdd = () => {
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState<FileList>()

  const {
    NotificationStore: {
      loading: {
        createAuthor: loading,
      },
    }
  } = Stores()

  const isLoading = loading?.status === 'PENDING'

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleGetImage = (file: FileList) => {
    console.log(file, 'file')

    setImage(file)
  }

  return {
    handleClose,
    handleOpen,
    handleGetImage,
    open,
    image,
    isLoading,
  }
}

export default useModalAdd