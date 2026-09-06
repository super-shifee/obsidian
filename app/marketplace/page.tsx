import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function MarketplacePage() {
  return <main className="min-h-screen bg-charcoal px-6 py-16 text-sand md:px-10"><div className="mx-auto max-w-5xl"><Link href="/" className="text-sm text-sand/60 hover:text-mineral"><ArrowLeft className="mr-2 inline size-4" /> Back home</Link><p className="mt-20 text-xs uppercase tracking-[0.2em] text-mineral">Marketplace</p><h1 className="mt-4 font-display text-5xl">Find verified materials.</h1><p className="mt-5 max-w-xl text-sand/60">The full catalog, advanced filters, and quotation workflows connect here.</p></div></main>
}
