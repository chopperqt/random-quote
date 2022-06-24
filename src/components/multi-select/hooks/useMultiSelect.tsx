import {
  MutableRefObject,
  useEffect,
  useState,
} from "react"
import {
  SelectList,
  SelectChange
} from "../MultiSelect"

interface useMultiSelectProps {
  selectElement: MutableRefObject<HTMLDivElement | null>
  onChange: SelectChange
}

export const useMultiSelect = ({
  selectElement,
  onChange,
}: useMultiSelectProps) => {
  const [selectedList, setSelectedList] = useState<SelectList[]>([])
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

  const handleClickOutSelect = (event: Event) => {
    if (!selectElement || (event.target instanceof Element && selectElement.current?.contains(event.target))) {
      return
    }

    setIsOpened(false)
  }

  const handleClickItem = (list: SelectList) => {
    setSelectedList([...selectedList, list])

    onChange({
      currentList: list,
      lists: [...selectedList, list],
    })
  }

  const handleClickSelectedItem = (list: SelectList) => {
    const updateLists = selectedList.filter(({ key }) => key !== list.key)

    setSelectedList(updateLists)

    onChange({
      currentList: list,
      lists: updateLists,
    })
  }

  useEffect(() => {
    window.addEventListener('click', handleClickOutSelect)
  }, [])

  return {
    isOpened,
    selectedList,
    handleClose,
    handleOpen,
    handleClickSelect,
    handleClickItem,
    handleClickSelectedItem,
  }
}

