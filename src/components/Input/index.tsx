import Input from 'components/input/Input'

export interface IInputProps extends React.ComponentProps<'input'> {
  className?: string
  fullWidth?: boolean
  label?: string
  error?: string
  loading?: boolean
  value?: string
  onClear?: () => void
}

export default Input