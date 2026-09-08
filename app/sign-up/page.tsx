"use client"

import { FormEvent, Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, Loader2, ShieldCheck } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

function SignUpContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/dashboard/buyer'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if ((event.nativeEvent as KeyboardEvent).isComposing || (event.nativeEvent as KeyboardEvent).keyCode === 229) return
    setPending(true)
    setError('')

    const result = await authClient.signUp.email({ name, email, password })
    if (result.error) {
      setError('Unable to create your account. Please check your details and try again.')
      setPending(false)
      return
    }

    router.push(redirectTo)
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-charcoal px-5 py-8 text-sand md:px-10">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-ink lg:grid-cols-[1.05fr_.95fr]">
        <section className="flex flex-col justify-between bg-mineral p-8 text-charcoal md:p-12 lg:p-16">
          <div>
            <Link href="/" className="font-display text-2xl tracking-tight">Black Sand Exchange</Link>
            <div className="mt-24 max-w-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-charcoal/60">Verified supply, clearly connected</p>
              <h1 className="mt-5 font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">Build your sourcing workspace.</h1>
              <p className="mt-6 max-w-md text-lg leading-8 text-charcoal/70">Create one account to discover materials, request quotes, and manage trusted supplier relationships.</p>
            </div>
          </div>
          <div className="mt-16 flex items-center gap-3 text-sm font-medium"><ShieldCheck className="size-5" /> Built for verified trade</div>
        </section>

        <section className="flex items-center p-8 md:p-12 lg:p-16">
          <div className="mx-auto w-full max-w-md">
            <p className="text-sm font-medium text-mineral">New to Black Sand?</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">Create your account.</h2>
            <p className="mt-4 text-lg leading-7 text-sand/55">Start with your details, then open your marketplace workspace.</p>
            <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
              <label className="flex flex-col gap-2 text-sm font-medium">Full name<input required type="text" value={name} onChange={(event) => setName(event.target.value)} className="h-14 rounded-xl border border-white/15 bg-charcoal px-4 text-base text-sand outline-none transition focus:border-mineral" placeholder="Your name" /></label>
              <label className="flex flex-col gap-2 text-sm font-medium">Email address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="h-14 rounded-xl border border-white/15 bg-charcoal px-4 text-base text-sand outline-none transition focus:border-mineral" placeholder="you@company.com" /></label>
              <label className="flex flex-col gap-2 text-sm font-medium">Password<input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="h-14 rounded-xl border border-white/15 bg-charcoal px-4 text-base text-sand outline-none transition focus:border-mineral" placeholder="At least 8 characters" /></label>
              {error ? <p role="alert" className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}
              <button disabled={pending} type="submit" className="inline-flex h-14 items-center justify-center gap-3 rounded-xl bg-mineral px-5 font-semibold text-charcoal transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60">{pending ? <Loader2 className="size-5 animate-spin" /> : null}{pending ? 'Creating account...' : 'Create account'}{!pending ? <ArrowRight className="size-5" /> : null}</button>
            </form>
            <p className="mt-8 text-sm text-sand/55">Already have an account? <Link href={`/sign-in${redirectTo !== '/dashboard/buyer' ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`} className="font-semibold text-mineral underline-offset-4 hover:underline">Sign in</Link></p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default function SignUpPage() {
  return <Suspense fallback={<main className="min-h-screen bg-charcoal" />}><SignUpContent /></Suspense>
}
