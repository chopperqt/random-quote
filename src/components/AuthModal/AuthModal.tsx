import Icon, { IconList } from "components/icon"
import Input from 'components/input'
import Modal from "components/modal"
import { signInWithGoogle } from 'utils/auth'

interface AuthModalProps {
  opened: boolean
  onClose: () => void
}

const LOGIN_PLEASE_TEXT = 'Войдите что бы добавить в закладки!'

const AuthModal = ({
  onClose,
  opened,
}: AuthModalProps) => (
  <Modal
    onClose={onClose}
    open={opened}
  >
    <>
      <form>
        <div className="heading--ls">{LOGIN_PLEASE_TEXT}</div>

        <Input>
        </Input>
        <Input>
        </Input>
      </form>
      <button onClick={signInWithGoogle}>
        <Icon icon={IconList.google} />
      </button>
    </>

  </Modal>

)

export default AuthModal