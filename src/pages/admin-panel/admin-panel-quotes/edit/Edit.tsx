import React from 'react'
import {
  useForm,
  SubmitHandler,
  Controller,
} from 'react-hook-form'

import { updateQuote } from 'utils/quotes'
import Selector from "components/selector/";
import Button from 'components/button'
import { useEdit } from '../hooks/useEdit';
import Modal from 'components/modal';
import Icon, { IconList } from 'components/icon';
import Textarea from 'components/textarea';
import { REQUITE_FIELD } from 'helpers/validateMessages'
import {
  EditProps,
  EditFormFields,
} from './Edit.types'

import styles from './Edit.module.scss'

const QUOTE_TEXT = 'Цитата'
const AUTHOR_TEXT = 'Автор'
const CREATE_TEXT = 'Изменить'
const QUOTE_PLACEHOLDER = 'Мужчины любят глазами, а девушки ушами'

const Edit = React.memo(({
  quote,
  quoteID,
  authorID,
}: EditProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: {
      errors,
    },
  } = useForm<EditFormFields>();

  const {
    isOpened,
    close,
    open,
    isUpdateLoading,
    isAuthorsLoading,
    options,
    defaultOption,
  } = useEdit({
    authorID,
  })

  const onSubmit: SubmitHandler<EditFormFields> = async (data) => {
    updateQuote(quoteID, +data.author.key, {
      text: data.text,
      id_author: +data.author.key
    })
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
          <Textarea
            {...register('text', { required: true })}
            label={QUOTE_TEXT}
            className={styles.input}
            error={errors.text?.message && REQUITE_FIELD}
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