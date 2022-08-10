import React, {
  useState,
  useEffect,
  useRef,
} from 'react'

type ImageType = (ArrayBuffer | string)

interface UseUploaderProps {
  onChange: (file: FileList) => void
}
export const useUploader = ({
  onChange,
}: UseUploaderProps) => {
  const [images, setImages] = useState<ImageType[]>([])
  const hasImages = images.length > 0

  const layoutRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const filesReader = (files: FileList): ImageType[] => {
    let buffer: ImageType[] = []

    // uploadFile(files[0])

    Array.from(files).forEach((file) => {
      const readImage = new FileReader()

      readImage.readAsDataURL(file)
      readImage.onloadend = () => {
        if (!readImage?.result) {
          return
        }

        setImages([...images, readImage.result])

        buffer = [...buffer, ((readImage?.result as ImageType) || '')]
      }
    })

    return buffer
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target?.files

    if (image === null) {
      return
    }

    onChange(image)
    filesReader(image)
  }

  const handleReset = (): void => {
    setImages([])
  }

  return {
    layoutRef,
    inputRef,
    handleChange,
    hasImages,
    images,
    handleReset,
  }
}