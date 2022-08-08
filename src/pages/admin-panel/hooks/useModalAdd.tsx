import { useState } from 'react'

const useModalAdd = () => {
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState<FileList>()

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
  }
}

export default useModalAdd