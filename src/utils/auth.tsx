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

export type AuthRequests =
  'loginWithGoogle' |
  'signUp' |
  'validateEmail' |
  'deleteUser' |
  'login' |
  'getUser'

export type UserEmail = string
export type UserID = string
export type UserPassword = string

export interface LoginData {
  email: UserEmail
  password: UserPassword
}

// FIXED добавить какие данные будут в дате при регистрации
export interface SignUpData extends LoginData {
  data: any
}

export const signInWithGoogle = async () => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses('loginWithGoogle')

  handlePending()

  const { error } = await supabase.auth.signIn({
    provider: 'google',
  })

  if (error) {
    handleFailure(error)
  }

  handleSuccess()
}

export const login = async ({
  email,
  password,
}: LoginData): Promise<string | undefined> => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses('login')

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

export const signUp = async ({
  email,
  password,
  data,
}: SignUpData): Promise<boolean> => {
  const {
    handleFailure,
    handlePending,
    handleSuccess
  } = loadingStatuses('signUp')

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

export const deleteUser = async (id: UserID) => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses('deleteUser')

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

export const validateEmail = debounce(async (email: UserEmail): Promise<any[]> => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses('validateEmail')

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
  } = loadingStatuses('getUser')

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