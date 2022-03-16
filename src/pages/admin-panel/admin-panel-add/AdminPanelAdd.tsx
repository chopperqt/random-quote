import React, { useState } from "react";

import Input from "components/Input/Input"
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

const AdminPanelAdd = () => {
  const [date, setDate] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [option, setOption] = useState<IOption>({ key: '', label: '' })

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    postQuote(text, date, +option.key)

    e.preventDefault()
  }

  return (
    <form
      onSubmit={(e) => handleSend(e)}
      className={styles.form}
    >
      <Selector
        initialValue={MOCK_DATA[0]}
        label={AUTHOR_TEXT}
        options={MOCK_DATA}
        onChange={setOption}
      />
      <Input
        value={date}
        onChange={(e) => setDate(e.currentTarget.value)}
        label={DATA_TEXT}
        className={styles.input}
      />
      <Input
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        label={QUOTE_TEXT}
        className={styles.input}
      />
      <Button type="submit">{CREATE_TEXT}</Button>
    </form>
  )
}

export default AdminPanelAdd