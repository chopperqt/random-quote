import cx from 'classnames'
import { useController } from 'react-hook-form'

import Img from 'components/img'
import Button from 'components/button'
import Icon, { IconList } from 'components/icon'
import { useUploader } from './hooks/useUploader'

import type { Control } from 'react-hook-form'

import styles from './Uploader.module.scss'

const UPLOAD_TEXT = 'Загрузите\nизображение'

interface UploaderProps {
  onChange: (file: FileList) => void
  name: string
  control: Control<any, any>
  onReset: () => void
}
const Uploader = ({
  onReset,
  name,
  control,
}: UploaderProps) => {
  const {
    field: {
      onChange: updateField,
    },
  } = useController({
    control,
    name,
  })

  const {
    handleChange,
    handleReset,
    image,
  } = useUploader({
    onChange: updateField,
    onReset,
  })

  return (
    <div
      className={cx(styles.layout, {
        [styles.layoutImage]: image,
      })}
    >
      {!image && (
        <>
          <input
            type="file"
            accept="image/*"
            id="uploader"
            className={styles.input}
            onChange={handleChange}
            name={name}
            value={image}
          />
          <label
            htmlFor="uploader"
            className={styles.label}
          >
            {UPLOAD_TEXT}
          </label>
        </>
      )}
      {image && (
        <Img
          src={image.toString()}
          height={250}
          alt="test"
          className={styles.image}
        />
      )}
      {image && (
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