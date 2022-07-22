import {
  useForm,
  SubmitHandler,
  Controller,
} from 'react-hook-form'

import Input from "components/input"
import { postQuote } from 'utils/quotes'
import Selector from "components/selector/";
import Button from 'components/button'
import { useEdit } from '../hooks/useEdit';
import { Stores } from 'services'
import { IAdminPanelAddField } from '../../constants'
import Modal from 'components/modal';

import styles from './Edit.module.scss'
import Icon, { IconList } from 'components/icon';


const QUOTE_TEXT = 'Цитата'
const DATA_TEXT = 'Дата'
const AUTHOR_TEXT = 'Автор'
const CREATE_TEXT = 'Редактирование'
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

interface EditProps {
  quote: string
}
const Edit = ({
  quote,
}: EditProps) => {
  const {
    NotificationStore: {
      loading: {
        postQuote: loading
      }
    }
  } = Stores()
  const hasLoading = loading?.status === 'PENDING'

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

  const {
    isOpened,
    close,
    open,
  } = useEdit()

  const onSubmit: SubmitHandler<IAdminPanelAddField> = async (data) => {
    const response = await postQuote({
      text: data.quote,
      time: data.date,
      author: +data.author.key
    })

    if (response) {
      resetField('date')
      resetField('quote')

      close()
    }
  }

  return (
    <>
      <Button
        className={styles.button}
        onClick={open}
      >
        <Icon icon={IconList.edit} />
      </Button>
      <Modal
        open={isOpened}
        onClose={close}
      >
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
            defaultValue={quote}
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
      </Modal>
    </>
  )
}

export default Edit