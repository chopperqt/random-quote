import Tooltip from "./Tooltip";

export interface ITooltip {
  children: JSX.Element
  className?: string
  position?: TTooltipPosition
  text: string
  offsetY?: number
}

export type TTooltipPosition = 'top' | 'left' | 'right' | 'bottom'

export default Tooltip;