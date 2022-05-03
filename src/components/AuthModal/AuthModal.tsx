import Button from "components/button"
import Icon, { IconList } from "components/icon"
import Input from 'components/input'
import Modal from "components/modal"
import { signInWithGoogle } from 'utils/auth'

import styles from './AuthModal.module.scss'

interface AuthModalProps {
  opened: boolean
  onClose: () => void
}

const LOGIN_PLEASE_TEXT = 'Войдите что бы добавить в закладки!'
const LOGIN_TEXT = 'Войти'
const LOGIN_PLACEHOLDER = 'Логин'
const PASSWORD_PLACEHOLDER = 'Пароль'

const AuthModal = ({
  onClose,
  opened,
}: AuthModalProps) => (
  <Modal
    onClose={onClose}
    open={opened}
  >
    <div className={styles.layout}>
      <form className={styles.form}>
        <div className="heading--ls">{LOGIN_PLEASE_TEXT}</div>
        <Input
          placeholder={LOGIN_PLACEHOLDER}
        />
        <Input
          type="password"
          placeholder={PASSWORD_PLACEHOLDER}
        />
        <Button>
          {LOGIN_TEXT}
        </Button>
      </form>
      <div>
        <Button
          className={styles.button}
          onClick={signInWithGoogle}
        >
          <Icon icon={IconList.google} />
        </Button>
      </div>
    </div>

  </Modal>

)

export default AuthModal