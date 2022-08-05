import { useState } from 'react'

import Button from "components/button"
import Icon, { IconList } from "components/icon"
import Modal from 'components/modal'

import styles from './TableDelete.module.scss'
import { QuoteID } from 'models/quotes.type'

const DELETE_TEXT = 'Удалить'
const CANCEL_TEXT = 'Отмена'
const DESCRIPTION_TEXT = 'Вы уверены, что хотите это сделать ?'

interface TableDeleteProps {
  onClick: (quoteID: QuoteID) => void
  onClose: () => void
  opened: boolean
  onOpen: () => void
  isLoading?: boolean
  quoteID: QuoteID
}
const TableDelete = ({
  opened = false,
  onClose,
  onOpen,
  onClick,
  isLoading = false,
  quoteID,
}: TableDeleteProps) => (
  <>
    <Button
      color="warning"
      onClick={onOpen}
      className={styles.button}
    >
      <Icon icon={IconList.trash} />
    </Button>
    <Modal
      open={opened}
      onClose={onClose}
    >
      <div className={styles.layout}>
        <div className="heading--sm">
          {DESCRIPTION_TEXT}
        </div>
        <div className={styles.wrap}>
          <Button
            className={styles.button}
            color="warning"
            onClick={() => onClick(quoteID)}
            loading={isLoading}
          >
            {DELETE_TEXT}
          </Button>
          <Button onClick={onClose}>
            {CANCEL_TEXT}
          </Button>
        </div>
      </div>
    </Modal>
  </>
)

export default TableDelete