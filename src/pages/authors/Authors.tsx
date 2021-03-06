import { useEffect } from 'react'

import { Stores } from 'services'
import { getAuthors } from 'utils/authors'
import Title from 'components/title'
import { AUTHORS_TITLE } from './constants'
import AuthorsSkeleton from './partials/AuthorsSkeleton'
import Grid from 'components/grid'
import Author from './partials/Author'

import styles from './Authors.module.scss'

const Authors = () => {
  const {
    NotificationStore: {
      loading,
    },
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
        {(loading.getAuthors?.status === 'PENDING' || !authors) && (
          <AuthorsSkeleton />
        )}
        <Grid
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
        </Grid>
      </div>
    </div>
  )
}

export default Authors