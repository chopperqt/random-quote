import {
  useForm,
  SubmitHandler,
  Controller,
} from 'react-hook-form'

import Button from "components/button"
import Icon, { IconList } from "components/icon"
import Input from 'components/input'
import Modal from "components/modal"
import { signInWithGoogle } from 'utils/auth'

import styles from './AuthModal.module.scss'

interface AuthModalProps {
  opened: boolean
  onClose: () => void
}

const LOGIN_PLEASE_TEXT = 'Войдите что бы добавить в закладки!'
const LOGIN_TEXT = 'Войти'
const LOGIN_PLACEHOLDER = 'Логин'
const PASSWORD_PLACEHOLDER = 'Пароль'

interface FormFields {
  login: string,
  password: string
}

const AuthModal = ({
  onClose,
  opened,
}: AuthModalProps) => {
  const {
    register,
    handleSubmit,
    resetField,
    control,
    formState: {
      errors,
    }
  } = useForm<FormFields>()

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data)
  }

  return (
    <Modal
      onClose={onClose}
      open={opened}
    >
      <div className={styles.layout}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
        >
          <div className="heading--ls">{LOGIN_PLEASE_TEXT}</div>
          <Input
            placeholder={LOGIN_PLACEHOLDER}
            error={errors.login && 'This field is Required'}
            {...(register('login', { required: true }))}
          />
          <Input
            type="password"
            placeholder={PASSWORD_PLACEHOLDER}
            error={errors.login && 'This field is Required'}
            {...(register('password', { required: true }))}
          />
          <Button
            type="submit"
          >
            {LOGIN_TEXT}
          </Button>
        </form>
        <div>
          <Button
            className={styles.button}
            onClick={signInWithGoogle}
          >
            <Icon icon={IconList.google} />
          </Button>
        </div>
      </div>

    </Modal>
  )
}

export default AuthModal