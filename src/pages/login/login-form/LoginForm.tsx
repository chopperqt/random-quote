import {
  useEffect,
  useState,
} from 'react'
import {
  useForm,
  SubmitHandler,
} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import cx from 'classnames'

import {
  REQUITE_FIELD,
  EMAIL_ERROR,
  VALIDATE_PASSWORD_ERROR,
} from 'helpers/validateMessages'
import {
  EMAIL_PATTERN,
  PASSWORD_PATTERN,
} from 'helpers/patterns'
import Button from 'components/button'
import Input from 'components/input'
import Link from 'components/link'
import {
  LOGIN_TITLE,
  BUTTON_TEXT,
  EMAIL_PLACEHOLDER,
  PASSWORD_PLACEHOLDER,
  QUESTION_TEXT,
} from '../constants'
import {
  login,
  LoginData,
} from 'utils/auth'
import { Stores } from 'services'
import { routes } from 'helpers/routes'

import styles from './LoginForm.module.scss'

const LoginForm = () => {
  const navigate = useNavigate()
  const {
    NotificationStore: {
      loading,
    }
  } = Stores()
  const [showError, setShowError] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
    resetField,
    watch,
  } = useForm<LoginData>()

  const passwordValue = watch('password')

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    const response = await login(data)

    if (response) {
      setShowError(true)
      setMessage(response)
      resetField('password')

      return
    }

    navigate(routes.profile)
  }

  useEffect(() => {
    if (passwordValue && passwordValue.length !== 0) {
      setShowError(false)
    }
  }, [passwordValue])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
    >
      <h3 className={styles.title}>{LOGIN_TITLE}</h3>
      <Input
        {...register('email', {
          required: REQUITE_FIELD,
          pattern: {
            value: EMAIL_PATTERN,
            message: EMAIL_ERROR,
          }
        })}
        placeholder={EMAIL_PLACEHOLDER}
        error={errors.email?.message}
      />
      <Input
        {...register('password', {
          required: REQUITE_FIELD,
          pattern: {
            value: PASSWORD_PATTERN,
            message: VALIDATE_PASSWORD_ERROR,
          }
        })}
        placeholder={PASSWORD_PLACEHOLDER}
        error={errors.password?.message}
      />
      <Link
        className={styles.link}
        to={routes.signUp}
      >
        {QUESTION_TEXT}
      </Link>
      <Button
        type="submit"
        loading={loading?.login?.status === 'PENDING'}
      >
        {BUTTON_TEXT}
      </Button>
      {showError && (
        <div className={cx('heading--sm', styles.error)}>{message}</div>
      )}
    </form>
  )
}

export default LoginForm