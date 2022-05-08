import {
  useForm,
  SubmitHandler,
  Controller,
} from 'react-hook-form'

import Input from 'components/input'
import { postQuote } from 'utils/quotes'
import Selector from "components/selector";
import Button from 'components/button'

import { Stores } from 'services'
import {
  IAdminPanelAdd,
  IAdminPanelAddField
} from '../../constants'

import styles from './Add.module.scss'

const QUOTE_TEXT = 'Цитата'
const DATA_TEXT = 'Дата'
const AUTHOR_TEXT = 'Автор'
const CREATE_TEXT = 'Создать'
const QUOTE_PLACEHOLDER = 'Мужчины любят глазами, а девушки ушами'
const DATA_PLACEHOLDER = '01.01.1999'

const MOCK_DATA = [
  {
    key: 1,
    label: 'Тим Бёртон'
  },
  {
    key: 2,
    label: 'Аль Пачино'
  }
]

const Add = ({
  onClose = () => { },
}: IAdminPanelAdd) => {
  const {
    NotificationStore: {
      loading: postQuoteStatus,
    }
  } = Stores()
  const hasLoading = postQuoteStatus.postQuote === 'PENDING'
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    control,
    formState: {
      errors,
    },
  } = useForm<IAdminPanelAddField>();

  const onSubmit: SubmitHandler<IAdminPanelAddField> = async (data) => {
    const response = await postQuote({
      text: data.quote,
      time: data.date,
      author: +data.author.key
    })

    if (response) {
      resetField('date')
      resetField('quote')

      onClose()
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
    >
      <Controller
        control={control}
        name="author"
        render={({ field: {
          onChange,
          onBlur,
          value,
          ref,
        } }) => (
          <Selector
            label={AUTHOR_TEXT}
            options={MOCK_DATA}
            onChange={onChange}
            initialValue={MOCK_DATA[0]}
          />
        )}
      />
      <Input
        label={DATA_TEXT}
        className={styles.input}
        error={errors.date && 'This field is Requited'}
        placeholder={DATA_PLACEHOLDER}
        {...(register("date", { required: true })) as any}
      />
      <Input
        {...register("quote", { required: true })}
        label={QUOTE_TEXT}
        className={styles.input}
        error={errors.quote && 'This field is Required'}
        placeholder={QUOTE_PLACEHOLDER}
      />
      <Button
        loading={hasLoading}
        type="submit"
      >{CREATE_TEXT}</Button>
    </form>
  )
}

export default Add