'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Mail, MapPin, Phone, Send, MessageCircle } from 'lucide-react'
import { contactInfo } from '@/lib/contact'

const channels = [
  { label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}`, action: 'Send Email', icon: Mail },
  { label: 'Phone', value: contactInfo.phoneDisplay, href: `tel:${contactInfo.phoneHref}`, action: 'Call Us', icon: Phone },
  { label: 'WhatsApp', value: contactInfo.phoneDisplay, href: contactInfo.whatsappUrl, action: 'Chat on WhatsApp', icon: MessageCircle },
  { label: 'Telegram', value: contactInfo.telegramHandle, href: contactInfo.telegramUrl, action: 'Message us on Telegram', icon: Send },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    event.currentTarget.reset()
  }

  return (
    <main className="min-h-screen bg-charcoal text-sand">
      <header className="border-b border-white/10 px-6 md:px-10"><div className="mx-auto flex h-20 max-w-7xl items-center justify-between"><Link href="/" className="flex items-center gap-3" aria-label="Black Sand home"><span className="grid size-9 place-items-center rounded-full bg-mineral text-charcoal"><span className="text-lg font-semibold">B</span></span><span className="font-display text-lg font-semibold tracking-[0.18em]">BLACK SAND</span></Link><Link href="/" className="text-sm text-sand/65 hover:text-mineral">Back to home</Link></div></header>
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28"><div className="max-w-2xl"><p className="mb-5 text-xs uppercase tracking-[0.24em] text-mineral">Get in touch</p><h1 className="font-display text-5xl leading-[1.05] tracking-[-0.045em] md:text-7xl">Let&apos;s move materials forward.</h1><p className="mt-7 max-w-xl text-lg leading-8 text-sand/65">Have questions about buying or selling black sand? Contact our team and we will be happy to assist you.</p></div>
        <div className="mt-16 grid gap-6 lg:grid-cols-[1.05fr_.95fr]"><form className="rounded-3xl border border-white/10 bg-ink p-6 md:p-8" onSubmit={handleSubmit}>{submitted && <p className="mb-5 rounded-xl border border-mineral/30 bg-mineral/10 px-4 py-3 text-sm text-mineral" role="status">Thank you for contacting us. We will get back to you as soon as possible.</p>}<div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm text-sand/70">Full Name<input required name="name" className="rounded-xl border border-white/10 bg-charcoal px-4 py-3 text-sand outline-none focus:border-mineral" placeholder="Your name" /></label><label className="grid gap-2 text-sm text-sand/70">Email<input required name="email" type="email" className="rounded-xl border border-white/10 bg-charcoal px-4 py-3 text-sand outline-none focus:border-mineral" placeholder="you@company.com" /></label></div><div className="mt-5 grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm text-sand/70">Phone Number<input required name="phone" type="tel" className="rounded-xl border border-white/10 bg-charcoal px-4 py-3 text-sand outline-none focus:border-mineral" placeholder="+251 ..." /></label><label className="grid gap-2 text-sm text-sand/70">Subject<input required name="subject" className="rounded-xl border border-white/10 bg-charcoal px-4 py-3 text-sand outline-none focus:border-mineral" placeholder="How can we help?" /></label></div><label className="mt-5 grid gap-2 text-sm text-sand/70">Message<textarea required name="message" rows={6} className="resize-none rounded-xl border border-white/10 bg-charcoal px-4 py-3 text-sand outline-none focus:border-mineral" placeholder="Tell us what you are looking for..." /></label><button type="submit" className="mt-6 inline-flex items-center rounded-full bg-mineral px-6 py-3 text-sm font-medium text-charcoal transition hover:bg-mineral-light">Send Message <ArrowRight className="ml-2 size-4" /></button></form>
          <aside className="rounded-3xl border border-mineral/25 bg-mineral p-7 text-charcoal md:p-9"><p className="text-xs uppercase tracking-[0.2em] text-charcoal/55">Direct channels</p><div className="mt-10 grid gap-7">{channels.map(({ label, value, href, action, icon: Icon }) => <div key={label} className="flex gap-4"><Icon className="mt-1 size-5" aria-hidden="true" /><div><p className="font-medium">{label}</p><p className="mt-1 text-sm text-charcoal/65">{value}</p><a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} className="mt-3 inline-flex rounded-full border border-charcoal/25 px-3 py-2 text-xs font-medium transition hover:bg-charcoal hover:text-sand">{action}</a></div></div>)}</div><div className="mt-10 flex gap-4 border-t border-charcoal/20 pt-6"><MapPin className="mt-1 size-5" aria-hidden="true" /><div><p className="font-medium">Office</p><p className="mt-1 text-sm text-charcoal/65">{contactInfo.officeDisplay}</p></div></div></aside></div>
      </section>
      <footer className="border-t border-white/10 px-6 py-8 md:px-10"><div className="mx-auto flex max-w-7xl items-center justify-between text-xs text-sand/40"><span>© 2026 Black Sand Exchange</span><Link href="/marketplace" className="hover:text-mineral">Explore marketplace</Link></div></footer>
    </main>
  )
}
