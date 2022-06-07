import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useUser from 'helpers/useUser'
import { routes } from 'helpers/routes'
import {
  signInWithGoogle,
  logOut,
  deleteUser,
} from 'utils/auth'

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useUser()

  useEffect(() => {
    if (!user) {
      navigate(routes.logIn)
    }
  }, [])

  return (
    <div>
      <button onClick={signInWithGoogle}>
        Войти
      </button>
      <button onClick={logOut}>
        Выйти
      </button>
      <button onClick={() => deleteUser(user!.id)}>
        Удалить аккаунт
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