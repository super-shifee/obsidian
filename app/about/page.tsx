import Link from 'next/link'
import { ArrowRight, Check, ShieldCheck, Globe2, FileCheck2 } from 'lucide-react'

const steps = [
  { icon: ShieldCheck, title: 'Verified supply', text: 'We review supplier identity, documentation, and material specifications before listings go live.' },
  { icon: FileCheck2, title: 'Clear specifications', text: 'Compare grades, origins, availability, and commercial details in one focused marketplace.' },
  { icon: Globe2, title: 'Serious connections', text: 'Qualified buyers and suppliers can move from discovery to a direct conversation with confidence.' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-charcoal text-sand">
      <div className="border-b border-white/10 bg-charcoal px-6 py-2 text-center text-xs tracking-wide text-sand/65">Trade with confidence. Every seller is verified before they list.</div>
      <header className="border-b border-white/10 bg-charcoal/95 px-6 backdrop-blur md:px-10">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Black Sand home">
            <span className="grid size-9 place-items-center rounded-full bg-mineral text-charcoal"><span className="text-lg font-semibold">B</span></span>
            <span className="font-display text-lg font-semibold tracking-[0.18em]">BLACK SAND</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm text-sand/65 md:gap-8">
            <Link href="/marketplace" className="hover:text-sand">Marketplace</Link>
            <Link href="/about" className="text-sand">How it works</Link>
            <Link href="/dashboard/buyer" className="rounded-full bg-mineral px-4 py-2 font-medium text-charcoal hover:bg-mineral-light">Sign in</Link>
          </nav>
        </div>
      </header>

      <section className="border-b border-white/10 px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.24em] text-mineral">How Black Sand works</p>
          <h1 className="max-w-4xl font-display text-5xl leading-[1.04] tracking-[-0.045em] md:text-7xl">A clearer way to move the materials that matter.</h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-sand/65">Black Sand is a trusted B2B marketplace for mineral buyers and suppliers. We make the first step of a global trade relationship easier to navigate.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }) => (
            <article key={title} className="border-t border-mineral pt-6">
              <Icon className="size-6 text-mineral" aria-hidden="true" />
              <h2 className="mt-8 font-display text-2xl">{title}</h2>
              <p className="mt-4 leading-7 text-sand/55">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-ink px-6 py-20 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div><p className="text-xs uppercase tracking-[0.2em] text-mineral">Start with confidence</p><h2 className="mt-4 max-w-xl font-display text-4xl tracking-[-0.035em] md:text-5xl">Find your next reliable material partner.</h2></div>
          <Link href="/marketplace" className="inline-flex items-center rounded-full bg-mineral px-6 py-4 text-sm font-medium text-charcoal hover:bg-mineral-light">Explore the marketplace <ArrowRight className="ml-2 size-4" /></Link>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10 md:px-10"><div className="mx-auto flex max-w-7xl items-center justify-between text-sm text-sand/45"><Link href="/" className="font-display tracking-[0.18em] text-sand/75">BLACK SAND</Link><span>© 2026 Black Sand Exchange</span></div></footer>
    </main>
  )
}
