import { useState } from "react"

import useUser from "helpers/useUser"
import {
  addBookmark,
  deleteBookmark,
} from "utils/bookmarks"

interface IBookmarkProps {
  id: number
  bookmarked: boolean
}

interface IBookmarkReturn {
  handleClickBookmark: () => void
  loading: boolean
}

const useBookmark = ({
  id,
  bookmarked = false,
}: IBookmarkProps): IBookmarkReturn => {
  const { user } = useUser()
  const [loading, setLoading] = useState<boolean>(false)

  const handleClickBookmark = async () => {
    if (!user) {
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

  return {
    handleClickBookmark,
    loading,
  }
}

export default useBookmark