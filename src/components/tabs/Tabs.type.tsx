export type Key = string | number

export interface Tab {
  title: string
  key: Key
}

export interface TabsProps {
  children?: JSX.Element | JSX.Element[]
  tabs: Tab[]
  initialTab?: Key
  onChange: (key: Key) => void
}

export interface TabProps {
  key: Key
  children: JSX.Element | JSX.Element[]
}

