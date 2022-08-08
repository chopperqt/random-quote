import Selector from './Selector'

export interface Option {
  key: string | number
  label: string
}

export interface SelectorProps {
  options: Option[]
  className?: string
  classNameInput?: string
  classNameOptions?: string
  fullWidth?: boolean
  label?: string
  initialValue?: Option
  onChange?: (option: Option) => void
  disabled?: boolean
  loading?: boolean
}

export default Selector