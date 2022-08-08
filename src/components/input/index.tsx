import { Input } from './Input'

export interface IInputProps extends React.ComponentProps<'input'> {
  className?: string
  classNameWrap?: string
  fullWidth?: boolean
  label?: string
  error?: string
  loading?: boolean
  value?: string
  onClear?: () => void
  area?: boolean
}

export default Input