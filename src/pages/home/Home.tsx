import React from 'react'
import { useSelector } from 'react-redux'

import Quote from 'components/quote'
import useHome from './hooks/useHome'
import Icon, { IconList } from 'components/icon'
import { IStore } from 'services'

import styles from './Home.module.scss'

const FOOTER_TEXT = 'Create with ❤️ by Chopper'

const Home = () => {
  const {
    hasLoading,
    handleChangeQuote,
  } = useHome()
  const quote = useSelector((store: IStore) => store.quotesStore.quote)

  return (
    <div className={styles.home}>
      <div className={styles.quote}>
        <Quote
          loading={hasLoading}
          quote={quote}
        />
        <div className={styles.footer}>
          <div>{FOOTER_TEXT}</div>
          <a
            href="https://github.com/chopperqt"
            target="_blank"
            rel="noreferrer"
          >
            <Icon icon={IconList.github} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Home