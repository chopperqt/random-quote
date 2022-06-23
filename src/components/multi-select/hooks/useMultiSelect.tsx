import {
  MutableRefObject,
  useEffect,
  useState,
} from "react"

interface useMultiSelectProps {
  selectElement: MutableRefObject<HTMLDivElement | null>
}
export const useMultiSelect = ({
  selectElement,
}: useMultiSelectProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false)

  const handleOpen = () => {
    setIsOpened(true)
  }

  const handleClose = () => {
    setIsOpened(false)
  }

  const handleClickSelect = () => {
    if (isOpened) {
      setIsOpened(false)

      return
    }

    setIsOpened(true)
  }

  const handleClickOutSelect = (event: any) => {
    if (!selectElement) {
      return
    }

    console.log(selectElement.current?.closest(event.target))

  }

  useEffect(() => {
    window.addEventListener('click', handleClickOutSelect)
  }, [])

  return {
    isOpened,
    handleClose,
    handleOpen,
    handleClickSelect,
  }
}

