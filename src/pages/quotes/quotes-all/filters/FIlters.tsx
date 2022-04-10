import React from 'react'

import Collapse from 'components/collapse'
import { useFilters } from '../../hooks'
import Skeleton from './partials/Skeleton'
import Checkbox from 'components/checkbox'
import Button from 'components/button'
import { RESET_FILTERS } from '../constants'
import { Stores } from 'services'

import styles from './Filters.module.scss'

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
  } = useFilters({})
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
              {authors.map(({ name, path }) => {
                const checked = filters?.authors.includes(path)

                return (
                  <Checkbox
                    checked={!!checked}
                    label={name}
                    onChange={(event) => handleChangeCheckbox(event, path)}
                  />
                )
              })}
            </div>
          </Collapse>
          <Button className={styles.button}>
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