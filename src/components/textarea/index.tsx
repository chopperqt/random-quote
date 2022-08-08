import Textarea from './Textarea'

export interface TextareaProps extends React.ComponentProps<'textarea'> {
  className?: string
  classNameWrap?: string
  fullWidth?: boolean
  label?: string
  error?: string
  loading?: boolean
  value?: string
  onClear?: () => void
}

export default Textarea