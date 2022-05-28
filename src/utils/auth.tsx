import loadingStatuses from "helpers/loadingStatuses";
import supabase from "./client";
import debounce from 'lodash.debounce'

import { Tables } from "./constants";
import {
  SuccessMessages
} from 'helpers/successMessages'
import {
  LOGIN_ERROR_EU,
  LOGIN_ERROR,
} from 'helpers/validateMessages'
const {
  signUpSuccess,
} = SuccessMessages

export const AuthRequests = {
  loginWithGoogle: 'loginWithGoogle',
  signUp: 'signUp',
  validateEmail: 'validateEmail',
  deleteUser: 'deleteUser',
  login: 'login',
  getUser: 'getUser',
}

export const signInWithGoogle = async () => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses(AuthRequests.loginWithGoogle)

  handlePending()

  const { error } = await supabase.auth.signIn({
    provider: 'google',
  })

  if (error) {
    handleFailure(error)
  }

  handleSuccess()
}

export const login = async (email: string, password: string): Promise<string | undefined> => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses(AuthRequests.login)

  handlePending()

  const {
    error,
    user,
    session,
  } = await supabase.auth
    .signIn({
      email,
      password,
    })

  if (error) {
    if (error.message === LOGIN_ERROR_EU) {
      handleSuccess()

      return LOGIN_ERROR
    }

    handleFailure(error)

    return
  }

  console.log(
    user, session)

  handleSuccess()
}

export const logOut = async () => {
  await supabase.auth.signOut()
}

export const signUp = async (email: string, password: string, data: any): Promise<boolean> => {
  const {
    handleFailure,
    handlePending,
    handleSuccess
  } = loadingStatuses(AuthRequests.signUp)

  handlePending()

  const { error } = await supabase.auth.signUp({
    email,
    password,
  }, {
    data,
  })

  if (error) {
    handleFailure(error)

    return false
  }

  handleSuccess(signUpSuccess)

  return true
}

export const deleteUser = async (id: string) => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses(AuthRequests.deleteUser)

  handlePending()

  const {
    data: user,
    error,
  } = await supabase.auth.api.deleteUser(id)

  if (error) {
    handleFailure(error)
  }

  console.log(user)

  handleSuccess()
}

export const validateEmail = debounce(async (email: string): Promise<any[]> => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses(AuthRequests.validateEmail)

  handlePending()

  const { data, error } = await supabase
    .from(Tables.users)
    .select('email')
    .like('email', email)

  if (error) {
    handleFailure(error)

    return []
  }

  handleSuccess()

  return data
})

export const getUser = async (token: string) => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses(AuthRequests.getUser)

  handlePending()

  const {
    user,
    error,
  } = await supabase.auth.api.getUser(token)

  if (error) {
    handleFailure(error)

    return
  }

  handleSuccess()
}