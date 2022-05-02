import { useState } from "react"

import useUser from "helpers/useUser"
import {
  addBookmark,
  deleteBookmark,
} from "utils/bookmarks"

interface UseBookmarkProps {
  id: number
  bookmarked: boolean
}

const useBookmark = ({
  id,
  bookmarked = false,
}: UseBookmarkProps) => {
  const { user } = useUser()
  const [loading, setLoading] = useState<boolean>(false)
  const [opened, setOpened] = useState<boolean>(false)

  const handleClickBookmark = async () => {
    if (!user) {
      setOpened(true)

      return
    }

    const defaultOption = {
      id_user: user.id,
      id_quote: id
    }

    setLoading(true)

    if (bookmarked) {
      const status = await deleteBookmark(defaultOption)

      setLoading(status)

      return
    }

    await addBookmark(defaultOption)

    setLoading(false)
  }

  const handleClose = () => {
    setOpened(false)
  }

  return {
    handleClickBookmark,
    handleClose,
    opened,
    loading,
  }
}

export default useBookmark