import Add from "./partials/Add"

import styles from './Content.module.scss'
import Modal from "components/modal"

const Content = () => (
  <div className={styles.layout}>
    <Add />
  </div>
)

export default Content