import cx from 'classnames'

import Img from 'components/img'
import Button from 'components/button'
import Icon, { IconList } from 'components/icon'

import styles from './Uploader.module.scss'
import { useUploader } from './hooks/useUploader'

const UPLOAD_TEXT = 'Загрузите изображение'


interface UploaderProps {
  onChange: (file: FileList) => void
}
const Uploader = ({
  onChange,
}: UploaderProps) => {
  const {
    layoutRef,
    inputRef,
    hasImages,
    images,
    handleReset,
    handleChange,
  } = useUploader({
    onChange,
  })

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
            onChange={handleChange}
          />
          <label
            htmlFor="uploader"
            className={styles.button}
          >
            {UPLOAD_TEXT}
          </label>
        </>
      )}
      {images && images.map((image, index) => {
        return (
          <Img
            key={index}
            className={styles.image}
            height={250}
            src={image}
            alt="SomeImage"
          />
        )
      })}
      {hasImages && (
        <Button
          className={styles.upload}
          color="warning"
          type="button"
          onClick={handleReset}
        >
          <Icon icon={IconList.trash} />
        </Button>
      )}
    </div>
  )
}

export default Uploader