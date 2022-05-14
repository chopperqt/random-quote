import {
  useForm,
  SubmitHandler,
} from 'react-hook-form'

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
  signUp,
  validateEmail,
} from 'utils/auth'
import Link from 'components/link'
import { Stores } from 'services'

import styles from './SignUpForm.module.scss'
import useResponse from 'helpers/useResponse'
import { useEffect } from 'react'

interface SignUpFields {
  email: string
  nickname: string
  password: string
  passwordRepeat: string
}

const SignUpForm = () => {
  const {
    NotificationStore: {
      loading,
    }
  } = Stores()
  const {
    register,
    handleSubmit,
    resetField,
    watch,
    formState: {
      errors
    },
  } = useForm<SignUpFields>()

  const {
    isLoading,
  } = useResponse({ loading: loading.signUp })

  const onSubmit: SubmitHandler<SignUpFields> = async (data) => {
    signUp(data.email, data.password, {
      nickname: data.nickname,
    })
  }

  useEffect(() => {
    validateEmail('ilua292010@gmail.com')
  }, [])

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
        })}
        placeholder={EMAIL_TEXT}
        error={errors.email?.message}
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