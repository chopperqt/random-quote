import { useState } from "react"

import useUser from "helpers/useUser"
import { addBookmark } from "utils/bookmarks"

interface IBookmarkProps {
  id: number
}

interface IBookmarkReturn {
  handleClickBookmark: () => void
  loading: boolean
}

const useBookmark = ({
  id,
}: IBookmarkProps): IBookmarkReturn => {
  const { user } = useUser()
  const [loading, setLoading] = useState<boolean>(false)

  const handleClickBookmark = () => {
    if (!user) {
      return
    }

    addBookmark({
      id_user: user.id,
      id_quote: id,
    })
  }

  return {
    handleClickBookmark,
    loading,
  }
}

export default useBookmark