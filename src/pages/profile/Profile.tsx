import React from 'react'
import { useNavigate } from 'react-router-dom'


import useUser from 'helpers/useUser'
import { routes } from 'helpers/routes'
import { signInWithGoogle } from 'utils/auth'

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useUser()

  if (!user) {
    navigate(routes.logIn)
  }

  return (
    <div>
      <button onClick={signInWithGoogle}>
        Войти
      </button>
    </div>
  )

}
export default Profile