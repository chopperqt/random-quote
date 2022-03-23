import Button from './Button'

export interface IButton extends React.ComponentProps<'button'> {
  className?: string
  loading?: boolean
  children?: JSX.Element | string,
  color?: TButton
}

export type TButton = 'primary' | 'warning'

export default Button