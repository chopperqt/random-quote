import React, { useState } from 'react'
import cx from 'classnames'

import styles from './Tabs.module.scss'

interface ITabItem {
  key: TKey
  children: JSX.Element
}

export const TabItem = ({
  key,
  children,
}: ITabItem) => (
  <div>{children}</div>
)

interface ITabs {
  children?: any
  tabs: ITab[]
  initialTab?: string | number
}

interface ITab {
  title: string
  key: TKey
}

type TKey = number | string

const Tabs = ({
  tabs,
  initialTab,
  children
}: ITabs) => {
  const [currentTab, setCurrentTab] = useState(initialTab || tabs[0].key)

  const handleClickTab = (key: TKey) => {
    setCurrentTab(key)
  }

  const tabContent = children.find((tab: any) => +currentTab === +tab.key)

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