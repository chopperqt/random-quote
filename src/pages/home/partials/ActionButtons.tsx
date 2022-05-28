
import Icon, { IconList } from 'components/icon'
import {
  PREVIOUS_QUOTE,
  NEXT_QUOTE,
} from '../constants'

import styles from '../Home.module.scss'

interface IActionButtonProps {
  disabled: boolean
  onClickLeft: () => void
  onClickRight: () => void
  disabledLeft: boolean
}

const ActionButtons = ({
  disabled,
  disabledLeft,
  onClickLeft,
  onClickRight,
}: IActionButtonProps) => (
  <div className={styles.actionsButtons}>
    <button
      aria-label={PREVIOUS_QUOTE}
      className={styles.btn}
      disabled={disabledLeft || disabled}
      onClick={onClickLeft}
    >
      <Icon icon={IconList.chevronCircleLeft} />
    </button>
    <button
      aria-label={NEXT_QUOTE}
      className={styles.btn}
      disabled={disabled}
      onClick={onClickRight}
    >
      <Icon icon={IconList.chevronCircleRight} />
    </button>
  </div>
)

export default ActionButtons