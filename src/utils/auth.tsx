import loadingStatuses from "helpers/loadingStatuses";
import supabase from "./client";
import debounce from 'lodash.debounce'

import { Tables } from "./constants";

export const AuthRequests = {
  loginWithGoogle: 'loginWithGoogle',
  signUp: 'signUp',
  validateEmail: 'validateEmail',
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

export const logOut = async () => {
  await supabase.auth.signOut()
}

export const signUp = async (email: string, password: string, data: any) => {
  const {
    handleFailure,
    handlePending,
    handleSuccess
  } = loadingStatuses(AuthRequests.signUp)

  handlePending()

  const { user, session, error } = await supabase.auth.signUp({
    email,
    password,
  }, {
    data,
  })

  if (error) {
    handleFailure(error)

    return
  }

  handleSuccess()
}

export const validateEmail = debounce(async (email: string) => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses(AuthRequests.validateEmail)

  handlePending()

  const { data, error } = await supabase
    .from(Tables.users)
    .select(`email`)
    .textSearch('email', `'${email}`)

  if (error) {
    handleFailure(error)

    return
  }

  handleSuccess()

  console.log(data)
})