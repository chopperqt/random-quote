import React, { useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form'


import Input from "components/input"
import { postQuote } from 'utils/quotes'
import Selector, { IOption } from "components/selector/Selector";
import Button from 'components/button'

import styles from './AdminPanelAdd.module.scss'

const QUOTE_TEXT = 'Цитата'
const DATA_TEXT = 'Дата'
const AUTHOR_TEXT = 'Автор'
const CREATE_TEXT = 'Создать'

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
  example: string,
  exampleRequited: string
}

const AdminPanelAdd = () => {
  const [date, setDate] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [option, setOption] = useState<IOption>({ key: '', label: '' })
  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
    },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data)


  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    postQuote(text, date, +option.key)

    e.preventDefault()
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
        {...register("example")}
        label={DATA_TEXT}
        className={styles.input}
      />
      <Input
        {...register("exampleRequited", { required: true })}
        label={QUOTE_TEXT}
        className={styles.input}
        error={errors.exampleRequited && 'This field is Required'}
      />
      <Button type="submit">{CREATE_TEXT}</Button>
    </form>
  )
}

export default AdminPanelAdd