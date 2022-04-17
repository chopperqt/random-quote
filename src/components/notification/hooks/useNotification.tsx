import { useState } from 'react'

const NOTIFICATION_DELAY = 2000

type TVisibility = 'show' | 'hide'

const useNotification = () => {
  const [visibility, setVisibility] = useState<TVisibility>('show')

  let timer = setTimeout(() => {
    setVisibility('hide')
  }, NOTIFICATION_DELAY)

  const handleHide = () => {
    clearTimeout(timer)
    setVisibility('hide')
  }

  return {
    visibility,
    handleHide,
  }
}

export default useNotification