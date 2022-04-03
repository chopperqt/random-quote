
import React, { useEffect, useRef } from 'react'

import Input from 'components/input'
import { SEARCH_TEXT } from '../../constants'

interface ISearchInputProps {
  value: string
  onChangeText: any
  className?: string
}

const SearchInput = ({
  value,
  onChangeText,
  className,
}: ISearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.addEventListener('input', onChangeText)

    return inputRef.current?.removeEventListener('input', onChangeText)
  }, [])

  return (
    <Input
      className={className}
      ref={inputRef}
      placeholder={SEARCH_TEXT}
      value={value}
      onChange={onChangeText}
    />
  )
}

export default SearchInput