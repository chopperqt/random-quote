import cx from 'classnames'

import Img from 'components/img'
import {
  useRef,
  useEffect,
  useState,
} from 'react'

import styles from './Uploader.module.scss'

const UPLOAD_TEXT = 'Загрузите изображение'

const Uploader = () => {
  const [images, setImages] = useState<(ArrayBuffer | string)[]>([])
  const hasImages = images.length > 0

  const layoutRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

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
    console.log('uploading File: ', file)
  }

  const handleFiles = (files: any) => {
    console.log('45', files)

    return [files].forEach(uploadFiles)
  }

  const handleDrop = (e: DragEvent) => {
    const dt = e.dataTransfer

    if (dt) {
      const files = dt.files

      const test = Array.from(files).forEach((file) => {
        const readImage = new FileReader()
        readImage.readAsDataURL(file)
        readImage.onloadend = () => {
          if (!readImage.result) {
            return
          }


          console.log('files', readImage.result)
          setImages([...images, readImage.result])
        }
      })

      handleFiles(test)
    }
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

    inputRef.current?.addEventListener('change', (e: any) => {
      console.log(e)
    })
  }, [])


  useEffect(() => {
    console.log(images)
  }, [images])

  return (
    <div
      ref={layoutRef}
      className={cx(styles.layout, {
        [styles.layoutImage]: hasImages,
      })}
    >
      {!hasImages && (
        <>
          <input
            ref={inputRef}
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
            {UPLOAD_TEXT}
          </label>
        </>
      )}
      {images && images.map((image) => {
        return (
          <Img
            className={styles.image}
            height={250}
            src={image}
            alt="SomeImage"
          />
        )
      })}
    </div>
  )
}

export default Uploader