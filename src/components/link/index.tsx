import Link from "./Link"

export interface ILink {
  to: string,
  activeLink?: string
  className?: string
  children: JSX.Element | JSX.Element[] | string
  alt?: string
}

export default Link