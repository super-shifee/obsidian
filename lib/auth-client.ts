import { createAuthClient } from 'better-auth/react'

// Keep auth requests same-origin so preview and deployed URLs both reach the
// app's catch-all Better Auth route without requiring a public env variable.
export const authClient = createAuthClient()

export const { signIn, signUp, signOut, useSession } = authClient
