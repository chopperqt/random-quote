import {
  useForm,
  SubmitHandler,
} from 'react-hook-form'

import {
  REQUITE_FIELD,
  EMAIL_ERROR,
  REPEAT_PASSWORD_ERROR,
  VALIDATE_PASSWORD_ERROR,
  EMAIL_ALREADY_EXIST,
} from 'helpers/validateMessages'
import { EMAIL_PATTERN, PASSWORD_PATTERN } from 'helpers/patterns'
import Button from 'components/button'
import Input from 'components/input'
import {
  LOGIN_TITLE,
  BUTTON_TEXT,
  EMAIL_PLACEHOLDER,
  PASSWORD_PLACEHOLDER,
} from '../constants'
import { login } from 'utils/auth'

import styles from './LoginForm.module.scss'

interface LoginFields {
  email: string
  password: string
}
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<LoginFields>()

  const onSubmit: SubmitHandler<LoginFields> = async ({
    email,
    password
  }) => {
    login(email, password)
  }

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
      <Button type="submit">
        {BUTTON_TEXT}
      </Button>
    </form>
  )
}

export default LoginForm