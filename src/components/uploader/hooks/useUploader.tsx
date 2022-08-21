import {
  useState,
} from 'react'
import getNormalizeFile from '../helper/getNormalizeFile'

import type { ChangeEvent } from 'react'
interface UseUploaderProps {
  onChange: (file: any) => void
  onReset: () => void
}
export const useUploader = ({
  onChange,
  onReset,
}: UseUploaderProps) => {
  const [image, setImage] = useState<string>('')

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    const image = target?.files as FileList

    if (image === null) {
      return
    }

    const normalizedFile = await getNormalizeFile(image[0])

    if (!normalizedFile) {
      return
    }

    setImage(normalizedFile.toString())

    console.log(image)

    onChange(image)
  }

  const handleReset = () => {
    onReset()
    setImage('')
  }

  return {
    handleChange,
    handleReset,
    image,
  }
}