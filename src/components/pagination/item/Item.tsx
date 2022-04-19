import cx from 'classnames'

import DefaultProps from 'helpers/defaultProps'

import styles from './Item.module.scss'

interface IItemProps {
  active?: boolean
  page: string | number | JSX.Element
  onClick: () => void
}

const Item = ({
  active = false,
  page,
  onClick = DefaultProps.function,
}: IItemProps) => (
  <button
    onClick={onClick}
    className={cx(styles.item, {
      'active-item': active,
    })}
  >
    {page}
  </button>
)

export default Item