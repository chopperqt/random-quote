import supabase from "./client";

export const signInWithGoogle = async () => {
  const { user, session, error } = await supabase.auth.signIn({
    provider: 'google',
  })

  if (error) {
    console.log(error)
  }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
}