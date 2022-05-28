import Button from './Button'

export interface IButton extends React.ComponentProps<'button'> {
  className?: string
  loading?: boolean
  children?: JSX.Element | string,
  color?: ButtonColor
}

export type ButtonColor = 'primary' | 'warning'

export default Button