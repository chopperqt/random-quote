
import styles from './Title.module.scss'

interface TitleProps {
  title: string,
  subText?: string
}
const Title = ({
  title,
  subText,
}: TitleProps) => (
  <div className={styles.title}>
    <div className="heading--lx text--bold">
      {title}
    </div>
    <div className={styles.description}>
      {subText}
    </div>
  </div>
)

export default Title