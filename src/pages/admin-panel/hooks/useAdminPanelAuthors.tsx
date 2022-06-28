import { useEffect } from 'react'

import { Stores } from 'services'
import { getAuthors } from 'utils/authors'

const useAdminPanelAuthors = () => {
  const {
    AuthorStore: {
      authors,
    }
  } = Stores()


  useEffect(() => {
    getAuthors()
  }, [])


  return {
    authors,
  }
}

export default useAdminPanelAuthors