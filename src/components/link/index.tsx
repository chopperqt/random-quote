import Link from "./Link"

export interface ILink {
  to: string,
  activeLink?: string
  className?: string
  children: JSX.Element | string
}

export default Link