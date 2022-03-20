import React, { useEffect, useState } from 'react'

const NOTIFICATION_DELAY = 2000

type TVisibility = 'show' | 'hide'

const useNotification = () => {
  const [visibility, setVisibility] = useState<TVisibility>('show')

  useEffect(() => {
    setTimeout(() => {
      setVisibility('hide')
    }, NOTIFICATION_DELAY)
  }, [])

  return {
    visibility
  }
}

export default useNotification