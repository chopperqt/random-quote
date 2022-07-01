import {
  useForm,
  SubmitHandler,
  Controller,
} from 'react-hook-form'

import Button from "components/button"
import Input from "components/input"
import Modal from "components/modal"
import useModalAdd from "pages/admin-panel/hooks/useModalAdd"
import { ADD_AUTHOR_TEXT } from '../../constants'

import styles from '../Content.module.scss'
import Uploader from 'components/uploader'

interface FormFields {
  name: string
  avatar: string
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
      <Button onClick={handleOpen}>
        {ADD_AUTHOR_TEXT}
      </Button>
      <Modal
        onClose={handleClose}
        open={open}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
        >
          <div>
            <div >
              <Uploader />
            </div>
            <div>
              <Input
                {...(register('name', { required: true }))}
                className={styles.input}
              />
              <Input
                {...(register('avatar', { required: true }))}
                className={styles.input}
              />
            </div>
          </div>
          <Button type='submit'>
            {ADD_AUTHOR_TEXT}
          </Button>
        </form>
      </Modal>
    </>
  )
}

export default Add