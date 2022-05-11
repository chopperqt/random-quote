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

import styles from './SignUp.module.scss'

const EMAIL_TEXT = 'Электронная почта'
const NICKNAME_TEXT = 'Ник'
const PASSWORD_TEXT = 'Пароль'
const REPEAT_PASSWORD_TEXT = 'Подтверждение пароля'
const SIGN_UP = 'Зарегистрироваться'
const SIGN_UP_TEXT = 'Регистрация'

interface SignUpFields {
  email: string
  nickname: string
  password: string
  passwordRepeat: string
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    resetField,
    watch,
    formState: {
      errors
    },
  } = useForm<SignUpFields>()

  const onSubmit: SubmitHandler<SignUpFields> = async (data) => {
    console.log(data)
  }

  return (
    <div className={styles.layout}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.section}
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
          loading={true}
        />
        <Input
          {...register('nickname', {
            required: REQUITE_FIELD,
          })}
          placeholder={NICKNAME_TEXT}
          error={errors.nickname?.message}
          loading={true}
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
            pattern: {
              value: PASSWORD_PATTERN,
              message: VALIDATE_PASSWORD_ERROR,
            },
            validate: {
              validateSamePassword: value => value === watch('password') || REPEAT_PASSWORD_ERROR
            }
          })}
          placeholder={REPEAT_PASSWORD_TEXT}
          error={errors.passwordRepeat?.message}
        />
        {console.log(watch('password'))}
        <Button
          type="submit"
        >
          {SIGN_UP}
        </Button>
      </form>
    </div>
  )
}

export default SignUp