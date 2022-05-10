import loadingStatuses from "helpers/loadingStatuses";
import supabase from "./client";

const AuthRequests = {
  loginWithGoogle: 'loginWithGoogle',
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