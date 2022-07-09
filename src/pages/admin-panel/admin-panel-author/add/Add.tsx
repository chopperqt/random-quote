import {
  useForm,
  SubmitHandler,
  Controller,
} from 'react-hook-form'

import Button from "components/button"
import Input from "components/input"
import Modal from "components/modal"
import useModalAdd from "pages/admin-panel/hooks/useModalAdd"
import Uploader from 'components/uploader'
import Icon, { IconList } from 'components/icon'

import styles from './Add.module.scss'

const Placeholders = {
  name: 'Имя',
  surName: 'Фамилия',
  secondName: 'Отчество',
}

const CREATE_TEXT = 'Создать автора'

interface FormFields {
  name: string
  avatar: string
  surName: string
  secondName: string
}

const Add = () => {
  const {
    register,
    handleSubmit,
    resetField,
    control,
    formState: {
      errors,
    }
  } = useForm<FormFields>()
  const {
    handleClose,
    handleOpen,
    open,
  } = useModalAdd()

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data)
  }

  return (
    <>
      <Button
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
            <Uploader />
            <div className={styles.fields}>
              <Input
                {...(register('name', { required: true }))}
                className={styles.input}
                placeholder={Placeholders.name}
              />
              <Input
                {...(register('surName', { required: true }))}
                className={styles.input}
                placeholder={Placeholders.surName}
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