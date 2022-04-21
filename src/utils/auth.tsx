import loadingStatuses from "helpers/loadingStatuses";
import supabase from "./client";

const AuthRequests = {
  loginWidthGoogle: 'loginWithGoogle',
}

export const signInWithGoogle = async () => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses(AuthRequests.loginWidthGoogle)

  handlePending()

  const { user, session, error } = await supabase.auth.signIn({
    provider: 'google',
  })

  if (error) {
    handleFailure(error)
  }

  handleSuccess()
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
}