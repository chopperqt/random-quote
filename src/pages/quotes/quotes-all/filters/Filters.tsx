import React from 'react'

import Collapse from 'components/collapse'
import { useFilters } from '../../hooks'
import Skeleton from './partials/Skeleton'
import Button from 'components/button'
import {
  RESET_FILTERS,
  AUTHORS_TEXT,
  FILTER_TITLE,
} from '../constants'
import MultiSelect from 'components/multi-select'

import styles from './Filters.module.scss'

const MOCK_LIST = [
  {
    key: 'mark-tven',
    value: 'Марк Твен',
  },
  {
    key: 'nokollo-makiaveli',
    value: 'Никколо Макиавелли'
  },
  {
    value: 'Вася пупкин',
    key: 'vasya-pupkn',
  },
]

const Filters = () => {
  const {
    handleCloseAuthors,
    handleOpenAuthors,
    openedAuthors,
    authorsTitle,
    isLoading,
    isSuccess,
    authors,
    handleClickButton,
    handleChangeSelector,
    handleReset,
    buttonText,
    filtersCount,
    defaultAuthors,
  } = useFilters()

  const formattedSelect = authors.map(_ => ({
    key: _.id_author,
    value: _.name,
  }))

  return (
    <div>
      <div className={styles.filters}>
        {isSuccess && (
          <>
            <Collapse
              open={openedAuthors}
              onClose={handleCloseAuthors}
              onOpen={handleOpenAuthors}
              text={AUTHORS_TEXT}
            >
              <MultiSelect
                classNameSelect={styles.selector}
                onChange={(list) => handleChangeSelector(list)}
                list={formattedSelect}
                listSelected={defaultAuthors}
              />
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
    </div>
  )
}

export default Filters