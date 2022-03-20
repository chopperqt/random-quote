import React, { useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form'

import Input from "components/input"
import { postQuote } from 'utils/quotes'
import Selector, { IOption } from "components/selector/Selector";
import Button from 'components/button'
import { notificationMethods } from 'services'

import styles from './AdminPanelAdd.module.scss'
import { useDispatch } from "react-redux";

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

const AdminPanelAdd = () => {
  const dispatch = useDispatch()
  const [option, setOption] = useState<IOption>({ key: '', label: '' })
  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
    },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    postQuote({
      text: data.quote,
      time: data.date,
      author: +option.key
    })

    dispatch(notificationMethods.createNotification('Учпешно', 'SUCCESS'))
  }

  console.log(watch("date"))

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
      <Button type="submit">{CREATE_TEXT}</Button>
    </form>
  )
}

export default AdminPanelAdd