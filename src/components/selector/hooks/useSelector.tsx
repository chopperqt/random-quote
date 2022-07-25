import React, { useState, useMemo, useEffect } from 'react'

import Icon, { IconList } from 'components/icon'
import { Option } from '../'

const DEFAULT_OPTION = {
  label: '',
  key: '',
}
export interface IUseSelector {
  inputRef: HTMLInputElement | null
  initialValue?: Option
  onChange: (option: Option) => void
}

const useSelector = ({
  inputRef,
  initialValue,
  onChange,
}: IUseSelector) => {
  const defaultOption = useMemo(() => {
    if (initialValue?.key) {
      return initialValue
    }

    return DEFAULT_OPTION
  }, [initialValue])

  const [option, setOption] = useState<Option>(defaultOption)
  const [value, setValue] = useState<string | number>(option.label)
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleClickValue = (data: Option) => {
    setOption(data)
    setValue(data.label)
    handleClose()
  }

  const handleClick = () => {
    if (open) {
      handleBlur()

      return
    }

    handleFocus()
  }

  const handleFocus = () => {
    inputRef?.focus()
    setOpen(true)
  }

  const handleBlur = () => {
    inputRef?.blur()
    setOpen(false)
  }

  const icon = useMemo(() => {
    if (open) {
      return (<Icon icon={IconList.chevronUp} />)
    }

    return <Icon icon={IconList.chevronDown} />
  }, [open])

  useEffect(() => {
    onChange(option)
  }, [option])

  useEffect(() => {
    if (!initialValue) {
      return
    }

    console.log('Сюда прилетаешь ? ', initialValue)

    setOption(initialValue)
    setValue(initialValue.label)
  }, [initialValue])

  return {
    open,
    value,
    option,
    handleFocus,
    handleBlur,
    handleOpen,
    handleClose,
    handleClick,
    handleClickValue,
    icon
  }
}

export default useSelector