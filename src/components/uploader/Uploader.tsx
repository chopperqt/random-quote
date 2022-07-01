import {
  useRef,
} from 'react'

import styles from './Uploader.module.scss'

const Uploader = () => {
  const layoutRef = useRef<HTMLDivElement | null>(null)

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

    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      if (!layoutRef.current) {
        return
      }

      layoutRef?.current.addEventListener(eventName, preventDefaults, false)
    })

    ;['dragenter', 'dragover'].forEach(eventName => {
      if (!layoutRef.current) {
        return
      }

      layoutRef.current.addEventListener(eventName, hightLight, false)
    })

    ;['dragleave', 'drop'].forEach(eventName => {
      if (!layoutRef.current) {
        return
      }

      layoutRef.current.addEventListener(eventName, unhighLight, false)
    })


  function preventDefaults(e: any) {
    e.preventDefault()
    e.stopPropagation()
  }




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
    </div>
  )
}

export default Uploader