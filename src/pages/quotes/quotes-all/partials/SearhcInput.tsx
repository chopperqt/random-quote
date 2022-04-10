
import React, { useEffect, useRef } from 'react'

import Input from 'components/input'
import { SEARCH_TEXT } from '../../constants'
import { updateUrlParams } from 'helpers/urlParams'

interface ISearchInputProps {
  value: string
  onChangeText: any
  loading?: boolean
  className?: string
  onClear: () => void
}

const SearchInput = ({
  value,
  onChangeText,
  className,
  onClear,
  loading
}: ISearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleBlur = () => {
    if (value) {
      updateUrlParams({
        search: value
      })
    }
  }

  useEffect(() => {
    inputRef.current?.addEventListener('input', onChangeText)

    return inputRef.current?.removeEventListener('input', onChangeText)
  }, [])

  return (
    <Input
      onBlur={handleBlur}
      loading={loading}
      className={className}
      ref={inputRef}
      placeholder={SEARCH_TEXT}
      value={value}
      onChange={onChangeText}
      onClear={onClear}
    />
  )
}

export default SearchInput