import Icon from './Icon'
import { IconList } from './IconList'

export {
  IconList
}

export interface IIcon {
  icon: IIconItem
}

export interface IIconItem {
  icon: JSX.Element
  viewport?: string
}

export default Icon