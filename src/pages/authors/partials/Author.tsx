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
  <div className={styles.author}>
    <Link to={routes.authors}
    >
      <Img
        className={styles.image}
        height={240}
        src={img}
        alt={name}
      />
    </Link>
    <div className="heading--ls">{name}</div>
    <div className="heading--sm">Some text</div>
  </div>
)

export default Author