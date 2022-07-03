import Img from 'components/img'
import {
  useRef,
  useEffect,
  useState,
} from 'react'

import styles from './Uploader.module.scss'

const Uploader = () => {
  const [images, setImages] = useState<(ArrayBuffer | string)[]>([])

  const layoutRef = useRef<HTMLDivElement | null>(null)

  const preventDefaults = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const hightLight = (e: any) => {
    if (!layoutRef.current) {
      return
    }

    layoutRef.current.classList.add('hightLight')
  }

  const unhighLight = (e: any) => {
    if (!layoutRef.current) {
      return
    }

    layoutRef.current.classList.remove('unhighlight')
  }

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    if (!layoutRef.current) {
      return
    }

    layoutRef?.current.addEventListener(eventName, preventDefaults, false)
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    if (!layoutRef.current) {
      return
    }

    layoutRef.current.addEventListener(eventName, hightLight, false)
  });

  ['dragleave', 'drop'].forEach(eventName => {
    if (!layoutRef.current) {
      return
    }

    layoutRef.current.addEventListener(eventName, unhighLight, false)
  });

  const uploadFiles = (file: any) => {
    console.log('uploading File: ', file)
  }

  const handleFiles = (files: any) => {
    ([...files]).forEach(uploadFiles)
  }

  const handleDrop = (e: DragEvent) => {
    const dt = e.dataTransfer

    if (dt) {
      const files = dt.files
      const formattedFiles = Array.from(files).forEach((file) => {
        const readImage = new FileReader()
        readImage.readAsDataURL(file)
        readImage.onloadend = () => {
          if (!readImage.result) {
            return
          }

          setImages([...images, readImage.result])
        }
      })

      console.log('formattedFiles: ', formattedFiles)

      handleFiles(files)

    }
  }


  useEffect(() => {
    if (!layoutRef.current) {
      return
    }

    layoutRef.current.addEventListener('drop', handleDrop, false)
  }, [])


  useEffect(() => {
    console.log(images)
  }, [images])

  return (
    <div
      ref={layoutRef}
      className={styles.layout}
    >
      <form action="">
        <p>Перетащите сюда файл</p>
        <input
          type="file"
          multiple
          accept="image/*"
          id="uploader"
          className={styles.input}
        />
        <label
          htmlFor="uploader"
          className={styles.button}
        >
          Выберите файл
        </label>
      </form>
      {images && images.map((image) => {



        return (
          <Img
            height={200}
            src={image}
            alt="SomeImage"
          />
        )
      })}
    </div>
  )
}

export default Uploader