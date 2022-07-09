import DefaultProps from "helpers/defaultProps"
import {
  MutableRefObject,
  useEffect,
  useState,
} from "react"
import {
  SelectList,
  SelectChange
} from "../MultiSelect"

interface FormattedList extends SelectList {
  disabled: boolean
}
interface useMultiSelectProps {
  selectElement: MutableRefObject<HTMLDivElement | null>
  onChange: SelectChange
  selectList?: SelectList[]
  list: SelectList[]
}
export const useMultiSelect = ({
  selectElement,
  onChange,
  selectList = DefaultProps.array,
  list = DefaultProps.array
}: useMultiSelectProps) => {
  const [selectedList, setSelectedList] = useState<SelectList[]>([...selectList])
  const [formattedList, setFormattedList] = useState<FormattedList[]>([])
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
    const hasSelectedList = selectedList.find(_ => _.key === list.key)

    if (hasSelectedList) {
      return
    }

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
    const updateList = list.map(_ => ({
      ..._,
      disabled: !!selectedList.find(__ => __.key === _.key)
    }))

    setFormattedList(updateList)
  }, [
    list,
    selectedList,
  ])

  useEffect(() => {
    window.addEventListener('click', handleClickOutSelect)
  }, [])

  return {
    isOpened,
    selectedList,
    formattedList,
    handleClose,
    handleOpen,
    handleClickSelect,
    handleClickItem,
    handleClickSelectedItem,
  }
}

