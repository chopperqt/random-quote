import Collapse from "./Collapse";

export interface ICollapseProps {
  text: string
  children?: JSX.Element
  open: boolean
  onOpen?: () => void
  onClose?: () => void
}

export default Collapse