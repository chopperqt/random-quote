import Img from "components/img/Img"
import Link from "components/link"
import { routes } from "helpers/routes"

import styles from '../Authors.module.scss'

interface AuthorProps {
  img: string,
  name: string,
}
const Author = ({
  img,
  name,
}: AuthorProps) => (
  <Link
    className={styles.author}
    to={routes.authors}

  >
    <>
      <Img
        height={200}
        src={img}
        alt={name}
      />
      adwawdawd
    </>
  </Link>
)

export default Author