import React from 'react'
import { useNavigate } from 'react-router-dom'


import useUser from 'helpers/useUser'
import { routes } from 'helpers/routes'
import {
  signInWithGoogle,
  logOut,
} from 'utils/auth'

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
      <button onClick={logOut}>
        Выйти
      </button>

      {user && (
        <>
          <img src={user.avatar_url} alt="user-avatar" />
          {user.email}
        </>
      )}

    </div>
  )

}
export default Profile