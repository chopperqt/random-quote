import {
  TabProps
} from '../Tabs.type'

export const Tab = ({
  children,
  key,
}: TabProps) => (
  <div key={key}>{children}</div>
)

export default Tab