import {
  useState,
  useEffect,
} from 'react'
import cx from 'classnames'
import {
  useForm,
  SubmitHandler,
} from 'react-hook-form'

import Button from "components/button"
import Icon, { IconList } from "components/icon"
import Input from 'components/input'
import Modal from "components/modal"
import {
  signInWithGoogle,
  login,
} from 'utils/auth'
import Link from 'components/link'
import {
  REQUITE_FIELD,
  EMAIL_ERROR,
  PASSWORD_MIN_LENGTH,
} from 'helpers/validateMessages'
import { EMAIL_PATTERN } from 'helpers/patterns'

import styles from './AuthModal.module.scss'
import { Stores } from 'services'
import { routes } from 'helpers/routes'

interface AuthModalProps {
  opened: boolean
  onClose: () => void
}

const LOGIN_PLEASE_TEXT = 'Войдите что бы добавить в закладки!'
const LOGIN_TEXT = 'Войти'
const LOGIN_PLACEHOLDER = 'Логин'
const PASSWORD_PLACEHOLDER = 'Пароль'
const QUESTION_TEXT = 'Вы еще не зарегистрированы ?'

interface FormFields {
  email: string,
  password: string
}

const AuthModal = ({
  onClose,
  opened,
}: AuthModalProps) => {
  const {
    NotificationStore: {
      loading,
    }
  } = Stores()
  const [message, setMessage] = useState<string>('')
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    watch,
  } = useForm<FormFields>()
  const passwordValue = watch('password')

  const onSubmit: SubmitHandler<FormFields> = async ({
    email,
    password,
  }) => {
    const response = await login({
      email,
      password,
    })

    if (response) {
      setMessage(response)
      resetField('password')

      return
    }

    onClose()
  }

  useEffect(() => {
    if (passwordValue && passwordValue.length !== 0) {
      setMessage('')
    }
  }, [passwordValue])

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
            error={errors.email?.message}
            {...(register('email', {
              required: REQUITE_FIELD,
              pattern: {
                value: EMAIL_PATTERN,
                message: EMAIL_ERROR,
              }
            }))}
          />
          <Input
            type="password"
            placeholder={PASSWORD_PLACEHOLDER}
            error={errors.password?.message}
            {...(register('password', {
              required: REQUITE_FIELD,
              min: PASSWORD_MIN_LENGTH,
            }))}
          />
          <Link
            to={routes.signUp}
            className={styles.link}
          >
            {QUESTION_TEXT}
          </Link>
          <Button
            loading={loading?.login?.status === 'PENDING'}
            type="submit"
          >
            {LOGIN_TEXT}
          </Button>
          {!!message && (
            <div className={cx('heading--sm', styles.error)}>{message}</div>
          )}
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