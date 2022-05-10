
import DefaultProps from 'helpers/defaultProps'
import Icon, { IconList } from 'components/icon'
import Tooltip from 'components/tooltip'

import styles from './Actions.module.scss'

interface IActionsProps {
  onCopy: () => void
}

const COPY_TEXT = 'Купировать'
const SHARING_TEXT = 'Поделиться'

const Actions = ({
  onCopy = DefaultProps.function,
}: IActionsProps) => (
  <div className={styles.actions}>
    <Tooltip
      position='left'
      text={COPY_TEXT}
    >
      <button
        aria-label={COPY_TEXT}
        onClick={onCopy}
        className={styles.button}>
        <Icon icon={IconList.copy} />
      </button>
    </Tooltip>
    <Tooltip
      position='left'
      text={SHARING_TEXT}
    >
      <button
        aria-label={SHARING_TEXT}
        className={styles.button}
      >
        <Icon icon={IconList.share} />
      </button>
    </Tooltip>

  </div>
)

export default Actions