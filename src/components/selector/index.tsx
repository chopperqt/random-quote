import Selector from './Selector'

export interface IOption {
  key: string | number
  label: string
}

export interface ISelector {
  options: IOption[]
  className?: string
  classNameInput?: string
  classNameOptions?: string
  fullWidth?: boolean
  label?: string
  initialValue?: IOption
  onChange?: (option: IOption) => void
}

export default Selector