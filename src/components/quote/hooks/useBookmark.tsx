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

  const handleAddBookmark = async (id_user: string): Promise<void> => {
    await addBookmark({
      id_user,
      id_quote: id,
    })

    setLoading(false)
  }

  const handleDeleteBookmark = async (id_user: string): Promise<void> => {
    await deleteBookmark({
      id_user,
      id_quote: id,
    })

    setLoading(false)
  }

  const handleClickBookmark = async () => {
    if (!user) {
      return
    }

    setLoading(true)

    let action: any = await handleAddBookmark(user.id)

    if (bookmarked) {
      action = await handleDeleteBookmark(user.id)
    }

    action()
  }

  return {
    handleClickBookmark,
    loading,
  }
}

export default useBookmark