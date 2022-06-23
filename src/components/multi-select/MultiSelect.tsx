import { useRef } from 'react'
import cx from 'classnames'

import { useMultiSelect } from "./hooks/useMultiSelect"

import styles from './MultiSelect.module.scss'

const MultiSelect = () => {
  const selectRef = useRef<HTMLDivElement | null>(null)
  const {
    isOpened,
    handleClose,
    handleOpen,
    handleClickSelect,
  } = useMultiSelect({
    selectElement: selectRef,
  })

  return (
    <div
      className={styles.multiSelect}
      ref={selectRef}
    >
      <div className={styles.select} onClick={handleClickSelect}>
        <div className={cx(styles.item, "heading--xs")}>Марк Твен</div>
        <div className={cx(styles.item, "heading--xs")}>Марк Твен</div>
        <div className={cx(styles.item, "heading--xs")}>Марк Твен</div>
        <div className={cx(styles.item, "heading--xs")}>Никколо Макиавелли</div>
      </div>
      {isOpened && (
        <div className={styles.modalWrap}>
          <div className={styles.modal}>
            <div className={styles.modalItem}>Марк твен</div>
            <div className={styles.modalItem}>никколо Макиавелли</div>
            <div className={styles.modalItem}>Марк твен</div>
            <div className={styles.modalItem}>никколо Макиавелли</div>
            <div className={styles.modalItem}>Марк твен</div>
            <div className={styles.modalItem}>никколо Макиавелли</div>
            <div className={styles.modalItem}>Марк твен</div>
            <div className={styles.modalItem}>никколо Макиавелли</div>
            <div className={styles.modalItem}>Марк твен</div>
            <div className={styles.modalItem}>никколо Макиавелли</div>
            <div className={styles.modalItem}>Марк твен</div>
            <div className={styles.modalItem}>никколо Макиавелли</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MultiSelect