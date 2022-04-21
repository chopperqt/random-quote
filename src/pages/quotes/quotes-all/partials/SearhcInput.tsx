
import { useEffect, useRef } from 'react'

import Input, { IInputProps } from 'components/input'
import { SEARCH_TEXT } from '../../constants'
import { updateUrlParams } from 'helpers/urlParams'

interface ISearchInputProps extends IInputProps {
  onChangeText: any
}

const SearchInput = ({
  value,
  onChangeText,
  className,
  onClear,
  loading,
  classNameWrap,
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
      classNameWrap={classNameWrap}
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