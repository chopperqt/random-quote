import React from 'react'

import Collapse from 'components/collapse'
import { useFilters } from '../../hooks'
import Skeleton from './partials/Skeleton'
import Checkbox from 'components/checkbox'
import Button from 'components/button'
import {
  RESET_FILTERS,
} from '../constants'
import { Stores } from 'services'

import styles from './Filters.module.scss'
import MultiSelect from 'components/multi-select'

const Filters = () => {
  const {
    handleCloseAuthors,
    handleOpenAuthors,
    openedAuthors,
    authorsTitle,
    isLoading,
    isSuccess,
    authors,
    handleChangeCheckbox,
    handleClickButton,
    handleReset,
    buttonText,
    filtersCount,
  } = useFilters()
  const {
    FilterStore
  } = Stores()

  const { filters } = FilterStore

  return (
    <div className={styles.filters}>
      {isSuccess && (
        <>
          <Collapse
            open={openedAuthors}
            onClose={handleCloseAuthors}
            onOpen={handleOpenAuthors}
            text={authorsTitle}
          >
            <div className={styles.authors}>
              {authors.map(({
                name,
                path,
                id_author,
              }) => {
                const checked = filters.authors?.includes(id_author)

                return (
                  <Checkbox
                    key={path}
                    checked={checked}
                    label={name}
                    onChange={(event) => handleChangeCheckbox(event, id_author)}
                  />
                )
              })}
            </div>
            <MultiSelect />
          </Collapse>
          <Button
            loading={filtersCount.isLoading}
            onClick={handleClickButton}
            className={styles.button}
          >
            {buttonText}
          </Button>
          <Button
            onClick={handleReset}
            color='warning'
            className={styles.button}
          >
            {RESET_FILTERS}
          </Button>
        </>
      )}
      {isLoading && (
        <Skeleton />
      )}
    </div>
  )
}

export default Filters