import {
  useForm,
  SubmitHandler,
} from 'react-hook-form'

import Button from "components/button"
import Input from "components/input"
import Modal from "components/modal"
import useModalAdd from "pages/admin-panel/hooks/useModalAdd"
import Uploader from 'components/uploader'
import Icon, { IconList } from 'components/icon'
import { createAuthor } from 'utils/authors'

import styles from './Add.module.scss'

const Placeholders = {
  name: 'Имя',
  surName: 'Фамилия',
  secondName: 'Отчество',
}

const CREATE_TEXT = 'Создать автора'

export interface FormFields {
  name: string
  surName: string
  secondName: string
}

const Add = () => {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isValid,
    }
  } = useForm<FormFields>()

  const {
    handleClose,
    handleOpen,
    handleGetImage,
    open,
    image,
  } = useModalAdd()

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    if (!image?.length) {
      return
    }

    createAuthor({
      ...data,
      avatar: image,
    })
  }

  return (
    <>
      <Button
        className={styles.create}
        onClick={handleOpen}
      >
        <>
          <Icon icon={IconList.save} />
          {CREATE_TEXT}
        </>
      </Button>
      <Modal
        onClose={handleClose}
        open={open}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
        >
          <div className={styles.section}>
            <Uploader
              onChange={handleGetImage}
            />
            <div className={styles.fields}>
              <Input
                {...(register('name', { required: true }))}
                className={styles.input}
                placeholder={Placeholders.name}
                error={errors.name && 'This field is Requited'}
              />
              <Input
                {...(register('surName', { required: true }))}
                className={styles.input}
                placeholder={Placeholders.surName}
                error={errors.surName && 'This field is Requited'}
              />
              <Input
                {...(register('secondName', { required: false }))}
                className={styles.input}
                placeholder={Placeholders.secondName}
              />
            </div>
          </div>
          <Button
            type='submit'
            className={styles.button}
          >
            {CREATE_TEXT}
          </Button>
        </form>
      </Modal>
    </>
  )
}

export default Add