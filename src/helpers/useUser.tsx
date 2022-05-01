import supabase from 'utils/client'

export interface IUseUser {
  role: string,
  email: string,
  id: string,
  avatar_url: string,
}

const useUser = () => {
  const hasUser = !!supabase.auth.user()

  let user: IUseUser | undefined

  if (hasUser) {
    const {
      role = '',
      email = '',
      id = '',
      user_metadata,
    } = supabase.auth.user() || {}
    const {
      avatar_url,
    } = user_metadata || {}

    user = {
      role,
      email,
      id,
      avatar_url,
    }
  }

  return {
    hasUser,
    user
  }
}

export default useUser