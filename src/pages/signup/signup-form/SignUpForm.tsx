import {
  useForm,
  SubmitHandler,
} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import Input from 'components/input'
import Button from 'components/button'
import {
  EMAIL_PATTERN,
  PASSWORD_PATTERN,
} from 'helpers/patterns'
import {
  REQUITE_FIELD,
  EMAIL_ERROR,
  REPEAT_PASSWORD_ERROR,
  VALIDATE_PASSWORD_ERROR,
  EMAIL_ALREADY_EXIST,
} from 'helpers/validateMessages'
import {
  EMAIL_TEXT,
  NICKNAME_TEXT,
  PASSWORD_TEXT,
  REPEAT_PASSWORD_TEXT,
  SIGN_UP_TEXT,
  SIGN_UP,
  QUESTION_TEXT,
} from '../constants'
import {
  LoginData,
  signUp,
  validateEmail,
} from 'utils/auth'
import Link from 'components/link'
import { Stores } from 'services'
import useResponse from 'helpers/useResponse'
import { routes } from 'helpers/routes'

import styles from './SignUpForm.module.scss'

interface SignUpFields extends LoginData {
  nickname: string
  passwordRepeat: string
}

const SignUpForm = () => {
  const navigate = useNavigate()
  const {
    NotificationStore: { loading }
  } = Stores()
  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors
    },
  } = useForm<SignUpFields>()

  const {
    isLoading,
  } = useResponse({ loading: loading.signUp })

  const onSubmit: SubmitHandler<SignUpFields> = async ({
    email,
    nickname,
    password,
  }) => {
    const response = await signUp({
      email,
      password,
      data: {
        nickname,
      },
    })

    if (response) {
      navigate(routes.logIn)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
    >
      <h3 className={styles.title}>{SIGN_UP_TEXT}</h3>
      <Input
        {...register('email', {
          required: REQUITE_FIELD,
          pattern: {
            value: EMAIL_PATTERN,
            message: EMAIL_ERROR,
          },
          validate: async (value) => {
            const response = await validateEmail(value)

            return response?.length !== 0 || EMAIL_ALREADY_EXIST
          }
        })}
        placeholder={EMAIL_TEXT}
        error={errors.email?.message}
        loading={loading.validateEmail.status === 'PENDING'}
      />
      <Input
        {...register('nickname', {
          required: REQUITE_FIELD,
        })}
        placeholder={NICKNAME_TEXT}
        error={errors.nickname?.message}
      />
      <Input
        {...register('password', {
          required: REQUITE_FIELD,
          pattern: {
            value: PASSWORD_PATTERN,
            message: VALIDATE_PASSWORD_ERROR,
          },
        })}
        placeholder={PASSWORD_TEXT}
        error={errors.password?.message}
      />
      <Input
        {...register('passwordRepeat', {
          required: REQUITE_FIELD,
          validate: {
            validateSamePassword: value => value === watch('password') || REPEAT_PASSWORD_ERROR
          }
        })}
        placeholder={REPEAT_PASSWORD_TEXT}
        error={errors.passwordRepeat?.message}
      />
      <Link
        className={styles.link}
        to="/login"
      >
        {QUESTION_TEXT}
      </Link>
      <Button
        loading={isLoading}
        type="submit"
      >
        {SIGN_UP}
      </Button>
    </form>
  )
}

export default SignUpForm