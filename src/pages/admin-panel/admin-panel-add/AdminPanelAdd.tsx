import React, { useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSelector } from 'react-redux'

import Input from "components/input"
import { postQuote } from 'utils/quotes'
import Selector, { IOption } from "components/selector/Selector";
import Button from 'components/button'
import { IStore } from 'services'

import styles from './AdminPanelAdd.module.scss'

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

type Inputs = {
  date: string,
  quote: string
}

interface IAdminPanelAdd {
  onClose?: () => void
}
const AdminPanelAdd = ({
  onClose = () => { },
}: IAdminPanelAdd) => {
  const postQuoteStatus = useSelector((store: IStore) => store.notificationsStore.loading)
  const hasLoading = postQuoteStatus.postQuote === 'PENDING'
  const [option, setOption] = useState<IOption>({ key: '', label: '' })
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: {
      errors,
    },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await postQuote({
      text: data.quote,
      time: data.date,
      author: +option.key
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
      <Selector
        initialValue={MOCK_DATA[0]}
        label={AUTHOR_TEXT}
        options={MOCK_DATA}
        onChange={setOption}
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

export default AdminPanelAdd