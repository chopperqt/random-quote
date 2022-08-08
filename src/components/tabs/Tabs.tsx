import React, {
  useState,
  useMemo,
  useEffect,
} from 'react'
import cx from 'classnames'

import {
  TabsProps,
  Key,
  TabProps,
} from './Tabs.type'

import styles from './Tabs.module.scss'

const Tabs = ({
  tabs,
  initialTab,
  onChange,
  children,
}: TabsProps) => {
  const [currentTab, setCurrentTab] = useState(initialTab || tabs[0].key)

  const handleClickTab = (key: Key) => {
    setCurrentTab(key)
    onChange(key)
  }

  const tabContent = useMemo(() => {
    return (children as any[]).find((tab: TabProps) => +currentTab === +tab.key)
  }, [
    children,
    currentTab,
  ])

  return (
    <div>
      <div className={styles.tabs}>
        {tabs.map(({ title, key }) => {
          const actualTab = key === currentTab

          return (
            <div
              className={cx(styles.tab, {
                'tab--active text--bold': actualTab,
              })}
              onClick={() => handleClickTab(key)}
              key={key}
            >
              {title}
            </div>
          )
        })}
      </div>
      <div className={styles.content}>
        {tabContent}
      </div>
    </div>
  )
}



export default Tabs