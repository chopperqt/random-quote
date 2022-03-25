import React from 'react'

import Quote from 'components/quote'
import useHome from './hooks/useHome'
import Icon, { IconList } from 'components/icon'
import Header from 'components/header'

import styles from './Home.module.scss'

const FOOTER_TEXT = 'Create with ❤️ by Chopper'

const Home = () => {
  const {
    hasLoading,
    text,
    data,
    author,
    handleChangeQuote,
  } = useHome()

  return (
    <div className={styles.home}>
      <Header />
      <div className={styles.quote}>
        <Quote
          loading={hasLoading}
          text={text}
          author={author}
          data={data}
        />
        <button
          onClick={handleChangeQuote}
          className={styles.button}
        >
          <Icon icon={IconList.repeat} />
        </button>
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