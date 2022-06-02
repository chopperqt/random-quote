import { useEffect } from 'react'
import Masonry from 'react-masonry-css'

import { Stores } from 'services'
import { getAuthors } from 'utils/authors'
import Author from './partials/Author'
import Title from 'components/title'
import { AUTHORS_TITLE } from './constatns'
import styles from './Authors.module.scss'

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
        <Masonry
          breakpointCols={2}
          className="my-masonry-grid"
          columnClassName='my-masonry-grid_column'
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
        </Masonry>
      </div>
    </div>
  )
}

export default Authors