import Icon from './Icon'
import { IconList } from './IconList'

const Color = {
  red: 'red',
  yellow: 'yellow'
}

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