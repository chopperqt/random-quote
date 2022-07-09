import Collapse from "./Collapse";

export interface CollapseProps {
  text: string
  children?: JSX.Element | JSX.Element[]
  open: boolean
  onOpen?: () => void
  onClose?: () => void
}

export default Collapse