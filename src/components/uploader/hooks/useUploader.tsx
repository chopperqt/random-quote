import {
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
    console.log(files)

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

  const preventDefaults = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const hightLight = () => {
    if (!layoutRef.current) {
      return
    }

    layoutRef.current.classList.add('hightLight')
  }

  const unhightLight = () => {
    if (!layoutRef.current) {
      return
    }

    layoutRef.current.classList.remove('unhighlight')
  }

  const uploadFiles = (file: any) => {
    //console.log('file: ', file)

    //uploadFile(file[0])
  }

  const handleFiles = (files: FileList) => {
    return [files].forEach((file) => uploadFiles(file))
  }

  const handleDrop = async (e: DragEvent | FileList) => {
    if (e instanceof DragEvent) {
      const dt = e.dataTransfer

      if (dt) {
        const files = dt.files

        const normalizedImages = filesReader(files)


        //console.log(normalizedImages)

        //setImages([...images, ...normalizedImages])

        //handleFiles(normalizedImages)
      }
    }
  }

  const handleSelectFile = (e: Event) => {
    const target = e.target as HTMLInputElement
    const normalizedImages = filesReader(target.files as FileList)

    if (!target?.files) {
      return
    }

    onChange(target.files)

    // handleFiles(normalizedImages)
  }

  useEffect(() => {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
      layoutRef.current?.addEventListener(eventName, preventDefaults, false)
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      layoutRef.current?.addEventListener(eventName, hightLight, false)
    });

    ['dragleave', 'drop'].forEach(eventName => {
      layoutRef.current?.addEventListener(eventName, unhightLight, false)
    });

    layoutRef.current?.addEventListener('drop', handleDrop, false)

    inputRef.current?.addEventListener('change', handleSelectFile)
  }, [])

  return {
    layoutRef,
    inputRef,
    handleDrop,
    handleFiles,
    handleSelectFile,
    hasImages,
    images,
  }
}