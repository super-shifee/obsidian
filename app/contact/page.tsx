'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    event.currentTarget.reset()
  }

  return (
    <main className="min-h-screen bg-charcoal text-sand">
      <header className="border-b border-white/10 px-6 md:px-10">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Black Sand home">
            <span className="grid size-9 place-items-center rounded-full bg-mineral text-charcoal"><span className="text-lg font-semibold">B</span></span>
            <span className="font-display text-lg font-semibold tracking-[0.18em]">BLACK SAND</span>
          </Link>
          <Link href="/" className="text-sm text-sand/65 hover:text-mineral">Back to home</Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="max-w-2xl">
          <p className="mb-5 text-xs uppercase tracking-[0.24em] text-mineral">Start a conversation</p>
          <h1 className="font-display text-5xl leading-[1.05] tracking-[-0.045em] md:text-7xl">Let&apos;s move materials forward.</h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-sand/65">Whether you are sourcing a new material or bringing supply to market, our team can help you find the right next step.</p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <form className="rounded-3xl border border-white/10 bg-ink p-6 md:p-8" onSubmit={handleSubmit}>
            {submitted && <p className="mb-5 rounded-xl border border-mineral/30 bg-mineral/10 px-4 py-3 text-sm text-mineral" role="status">Your inquiry has been received. We&apos;ll get back to you within one business day.</p>}
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-sand/70">Name<input required className="rounded-xl border border-white/10 bg-charcoal px-4 py-3 text-sand outline-none focus:border-mineral" placeholder="Your name" /></label>
              <label className="grid gap-2 text-sm text-sand/70">Work email<input required type="email" className="rounded-xl border border-white/10 bg-charcoal px-4 py-3 text-sand outline-none focus:border-mineral" placeholder="you@company.com" /></label>
            </div>
            <label className="mt-5 grid gap-2 text-sm text-sand/70">I am interested in<select className="rounded-xl border border-white/10 bg-charcoal px-4 py-3 text-sand outline-none focus:border-mineral"><option>Sourcing materials</option><option>Listing my supply</option><option>Partnerships</option><option>General question</option></select></label>
            <label className="mt-5 grid gap-2 text-sm text-sand/70">Message<textarea required rows={6} className="resize-none rounded-xl border border-white/10 bg-charcoal px-4 py-3 text-sand outline-none focus:border-mineral" placeholder="Tell us what you are looking for..." /></label>
            <button type="submit" className="mt-6 inline-flex items-center rounded-full bg-mineral px-6 py-3 text-sm font-medium text-charcoal transition hover:bg-mineral-light">Send inquiry <ArrowRight className="ml-2 size-4" /></button>
          </form>

          <aside className="rounded-3xl border border-mineral/25 bg-mineral p-7 text-charcoal md:p-9">
            <p className="text-xs uppercase tracking-[0.2em] text-charcoal/55">Direct channels</p>
            <div className="mt-10 grid gap-8">
              <div className="flex gap-4"><Mail className="mt-1 size-5" /><div><p className="font-medium">Email</p><a href="mailto:hello@blacksand.exchange" className="mt-1 block text-sm text-charcoal/65 hover:text-charcoal">hello@blacksand.exchange</a></div></div>
              <div className="flex gap-4"><Phone className="mt-1 size-5" /><div><p className="font-medium">Phone</p><p className="mt-1 text-sm text-charcoal/65">+1 212 555 0148</p></div></div>
              <div className="flex gap-4"><MapPin className="mt-1 size-5" /><div><p className="font-medium">Office</p><p className="mt-1 text-sm leading-6 text-charcoal/65">Harbor District<br />New York, NY 10001</p></div></div>
            </div>
            <div className="mt-12 border-t border-charcoal/20 pt-6 text-sm leading-6 text-charcoal/65">We typically respond within one business day. For active orders, include your reference number in the message.</div>
          </aside>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 md:px-10"><div className="mx-auto flex max-w-7xl items-center justify-between text-xs text-sand/40"><span>© 2026 Black Sand Exchange</span><Link href="/marketplace" className="hover:text-mineral">Explore marketplace</Link></div></footer>
    </main>
  )
}
