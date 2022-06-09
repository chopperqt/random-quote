import { useMultiSelect } from "./hooks/useMultiSelect"

import styles from './MultiSelect.module.scss'

const MultiSelect = () => {
  const {
    handleClose,
    handleOpen,
  } = useMultiSelect()

  return (
    <div className={styles.multiSelect}>
      <div></div>

      <div></div>
    </div>
  )
}

export default MultiSelect