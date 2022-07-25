import React from 'react'
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
import { IAdminPanelAddField } from '../../constants'
import Modal from 'components/modal';
import Icon, { IconList } from 'components/icon';
import Textarea from 'components/textarea';
import { REQUITE_FIELD } from 'helpers/validateMessages'

import styles from './Edit.module.scss'

const QUOTE_TEXT = 'Цитата'
const DATA_TEXT = 'Дата создания'
const DATA_UPDATE_TEXT = 'Последнее обновления'
const AUTHOR_TEXT = 'Автор'
const CREATE_TEXT = 'Изменить'
const QUOTE_PLACEHOLDER = 'Мужчины любят глазами, а девушки ушами'

interface EditProps {
  quote: string
  createdAt: Date,
  updatedAt?: Date,
  idAuthor: number
}
const Edit = React.memo(({
  quote,
  createdAt,
  updatedAt,
  idAuthor,
}: EditProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: {
      errors,
    },
  } = useForm<IAdminPanelAddField>();

  const {
    isOpened,
    close,
    open,
    isUpdateLoading,
    isAuthorsLoading,
    options,
    defaultOption,
  } = useEdit({
    idAuthor,
  })

  const onSubmit: SubmitHandler<IAdminPanelAddField> = async (data) => {
    console.log(data)
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
            } }) => (
              <Selector
                label={AUTHOR_TEXT}
                options={options}
                onChange={onChange}
                initialValue={defaultOption}
                loading={isAuthorsLoading || !defaultOption}
              />
            )}
          />
          <Input
            {...(register("date"))}
            label={DATA_TEXT}
            className={styles.input}
            defaultValue={createdAt.toString()}
            disabled={false}
            value={`${createdAt}`}
          />
          <Textarea
            {...register('quote', { required: true })}
            label={QUOTE_TEXT}
            className={styles.input}
            error={errors.quote?.message && REQUITE_FIELD}
            placeholder={QUOTE_PLACEHOLDER}
            defaultValue={quote}
          />
          <Button
            loading={isUpdateLoading}
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            {CREATE_TEXT}
          </Button>
        </form>
      </Modal>
    </>
  )
})

export default Edit