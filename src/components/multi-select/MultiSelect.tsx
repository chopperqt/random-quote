import { useRef } from 'react'
import cx from 'classnames'

import { useMultiSelect } from "./hooks/useMultiSelect"
import DefaultProps from 'helpers/defaultProps'

import styles from './MultiSelect.module.scss'

export type SelectKey = string | number
export type SelectValue = string | number
export type SelectChange = (value: ChangeReturn) => void

export interface ChangeReturn {
  currentList: SelectList,
  lists: SelectList[]
}
export interface SelectList {
  key: SelectKey,
  value: SelectValue,
}

interface MultiSelectProps {
  list: SelectList[]
  onChange: (list: ChangeReturn) => void
  listSelected?: SelectList[]
}

const MultiSelect = ({
  list = DefaultProps.array,
  onChange,
  listSelected = DefaultProps.array
}: MultiSelectProps) => {
  const selectRef = useRef<HTMLDivElement | null>(null)
  const {
    isOpened,
    handleOpen,
    formattedList,
    selectedList,
    handleClickItem,
    handleClickSelectedItem,
  } = useMultiSelect({
    onChange,
    selectElement: selectRef,
    selectList: listSelected,
    list,
  })

  return (
    <div
      className={styles.multiSelect}
      ref={selectRef}
    >
      <div className={styles.select} onClick={handleOpen}>
        {selectedList.map(({
          value,
          key,
        }) => (
          <div
            key={key}
            className={cx(styles.item, "heading--xs")}
            onClick={() => handleClickSelectedItem({ key, value })}
          >
            {value}
          </div>
        ))}
      </div>
      {isOpened && (
        <div className={styles.modalWrap}>
          <div className={styles.modal}>
            {formattedList.map(({
              value,
              key,
              disabled,
            }) => (
              <div
                key={key}
                onClick={() => handleClickItem({
                  value,
                  key,
                })}
                className={cx(styles.modalItem, {
                  [styles.modalItemDisabled]: disabled,
                })}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MultiSelect