import {
  useForm,
  SubmitHandler,
  Controller,
} from 'react-hook-form'

import { postQuote } from 'utils/quotes'
import Selector from "components/selector";
import Button from 'components/button'

import {
  AdminPanelModal,
  IAdminPanelAddField
} from '../../constants'

import styles from './Add.module.scss'
import useAdd from '../hooks/useAdd';
import Textarea from 'components/textarea';

const QUOTE_TEXT = 'Цитата'
const AUTHOR_TEXT = 'Автор'
const CREATE_TEXT = 'Создать'
const QUOTE_PLACEHOLDER = 'Мужчины любят глазами, а девушки ушами'

const Add = ({
  onClose = () => { },
  isOpened,
}: AdminPanelModal) => {
  const {
    loading,
    options,
    loadingOptions,
  } = useAdd({
    isOpened,
  })
  const hasLoading = loading?.status === 'PENDING'
  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: {
      errors,
    },
  } = useForm<IAdminPanelAddField>();

  const onSubmit: SubmitHandler<IAdminPanelAddField> = async ({
    text,
    author: {
      key,
    }
  }) => {
    const response = await postQuote({
      text,
      authorID: +key,
    })

    if (response) {
      resetField('text')

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
            disabled={loadingOptions}
            label={AUTHOR_TEXT}
            options={options}
            onChange={onChange}
            initialValue={options[0]}
          />
        )}
      />
      <Textarea
        {...register("text", { required: true })}
        label={QUOTE_TEXT}
        className={styles.input}
        error={errors.text && 'This field is Required'}
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