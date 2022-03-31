import cx from 'classnames'

import Icon, { IconList } from "components/icon"

import styles from './Footer.module.scss'

import { IFooterProps } from './'

const FOOTER_TEXT = 'Create with ❤️ by Chopper'


const Footer = ({
  className,
}: IFooterProps) => (
  <div className={cx(styles.footer, className)}>
    <div>{FOOTER_TEXT}</div>
    <a
      href="https://github.com/chopperqt"
      target="_blank"
      rel="noreferrer"
      className={styles.link}
    >
      <Icon icon={IconList.github} />
    </a>
  </div>
)

export default Footer