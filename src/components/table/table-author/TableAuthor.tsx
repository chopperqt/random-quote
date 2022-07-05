import Img from 'components/img'
import { Author } from 'services/authors'

import styles from './TableAuthor.module.scss'

const DEFAULT_STRING = 'https://gkywdfbpxquelncihepl.supabase.co/storage/v1/object/public/(.*)'

type TableAuthor = Pick<Author, 'name' | 'avatar'>

interface TableAuthorProps extends TableAuthor {
  height: number,
}

const TableAuthor = ({
  name,
  avatar,
  height
}: TableAuthorProps) => {
  const formattedAvatar = avatar.match(DEFAULT_STRING)?.[1] || avatar

  return (
    <div className={styles.layout}>
      <Img
        alt={name}
        src={avatar}
        height={height}
      />
      <div>
        {formattedAvatar}
      </div>
    </div>
  )
}

export default TableAuthor