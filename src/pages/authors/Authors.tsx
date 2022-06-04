import { useEffect } from 'react'

import { Stores } from 'services'
import { getAuthors } from 'utils/authors'
import Author from './partials/Author'
import Title from 'components/title'
import { AUTHORS_TITLE } from './constants'
import Grid from 'components/grid'

import styles from './Authors.module.scss'
import AuthorsSkeleton from './partials/AuthorsSkeleton'

const Authors = () => {
  const {
    AuthorStore: {
      authors,
    }
  } = Stores()

  useEffect(() => {
    getAuthors()
  }, [])

  return (
    <div className={styles.layout}>
      <div className="container">
        <Title
          title={AUTHORS_TITLE}
          subText="Всего 2 автора"
        />
        <AuthorsSkeleton />
        {/* <Grid
          breakpointCols={5}
          className={styles.wrap}
        >
          {authors.map(({
            avatar,
            name,
          }) => (
            <Author
              name={name}
              img={avatar}
            />
          ))}
        </Grid> */}
      </div>
    </div>
  )
}

export default Authors