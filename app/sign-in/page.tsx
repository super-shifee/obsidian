"use client"

import { FormEvent, Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, Loader2, ShieldCheck } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

function SignInContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/dashboard/buyer'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (event.nativeEvent.isComposing || (event as unknown as KeyboardEvent).keyCode === 229) return
    setPending(true)
    setError('')
    const result = await authClient.signIn.email({ email, password })
    if (result.error) {
      setError('Unable to sign in with those details. Please check your email and password.')
      setPending(false)
      return
    }
    router.push(redirectTo)
    router.refresh()
  }

  return <main className="min-h-screen bg-charcoal px-5 py-8 text-sand md:px-10"><div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-ink lg:grid-cols-[1.05fr_.95fr]"><section className="flex flex-col justify-between bg-mineral p-8 text-charcoal md:p-12 lg:p-16"><div><Link href="/" className="font-display text-2xl tracking-tight">Black Sand Exchange</Link><div className="mt-24 max-w-lg"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-charcoal/60">Verified supply, clearly connected</p><h1 className="mt-5 font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">Your next shipment starts here.</h1><p className="mt-6 max-w-md text-lg leading-8 text-charcoal/70">Access your sourcing workspace, manage quote requests, and connect with trusted mineral suppliers.</p></div></div><div className="mt-16 flex items-center gap-3 text-sm font-medium"><ShieldCheck className="size-5" /> Built for verified trade</div></section><section className="flex items-center p-8 md:p-12 lg:p-16"><div className="mx-auto w-full max-w-md"><p className="text-sm font-medium text-mineral">Welcome back</p><h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">Sign in to continue.</h2><p className="mt-4 text-lg leading-7 text-sand/55">Use your account credentials to open your marketplace workspace.</p><form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5"><label className="flex flex-col gap-2 text-sm font-medium">Email address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="h-14 rounded-xl border border-white/15 bg-charcoal px-4 text-base text-sand outline-none transition focus:border-mineral" placeholder="you@company.com" /></label><label className="flex flex-col gap-2 text-sm font-medium">Password<input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="h-14 rounded-xl border border-white/15 bg-charcoal px-4 text-base text-sand outline-none transition focus:border-mineral" placeholder="Enter your password" /></label>{error && <p role="alert" className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</p>}<button disabled={pending} className="inline-flex h-14 items-center justify-center rounded-xl bg-mineral px-5 text-base font-semibold text-charcoal transition hover:bg-mineral-light disabled:cursor-not-allowed disabled:opacity-60">{pending ? <Loader2 className="size-5 animate-spin" /> : <>Sign in <ArrowRight className="ml-2 size-5" /></>}</button></form><p className="mt-8 text-center text-sm text-sand/50">New to Black Sand Exchange? <Link href="/sign-up" className="font-medium text-mineral hover:text-mineral-light">Create an account</Link></p></div></section></div></main>
}

export default function SignInPage() {
  return <Suspense fallback={<main className="min-h-screen bg-charcoal" />}><SignInContent /></Suspense>
}
