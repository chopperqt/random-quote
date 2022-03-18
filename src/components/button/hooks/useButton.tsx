import React, { useMemo } from 'react'

interface IUseButton {
  loading?: boolean
}
const useButton = ({
  loading,
}: IUseButton) => {
  const hasLoaderVisible = useMemo(() => {
    if (loading) {
      return true
    }

    return false
  }, [loading])

  return {
    hasLoaderVisible
  }
}

export default useButton