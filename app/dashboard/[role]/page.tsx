import Link from 'next/link'
import { ArrowRight, Bell, ClipboardList, FileSearch, Heart, Search, Settings, ShieldCheck, ShoppingBag } from 'lucide-react'

type Props = { params: Promise<{ role: string }> }

const savedMaterials = [
  { name: 'Premium Ilmenite Sand', origin: 'Mozambique', grade: 'TiO₂ 54%+', availability: '2,500 MT available' },
  { name: 'High-Grade Graphite', origin: 'Madagascar', grade: 'TGC 96%+', availability: '800 MT available' },
]

function BuyerDashboard() {
  return <>
    <div className="mt-12 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">
      <div><p className="text-sm text-sand/50">Good morning, buyer</p><h1 className="mt-2 font-display text-5xl tracking-tight">Your sourcing workspace</h1><p className="mt-4 max-w-xl leading-7 text-sand/60">Track saved materials, manage quote requests, and discover verified supply for your next shipment.</p></div>
      <Link href="/marketplace" className="inline-flex items-center justify-center rounded-full bg-mineral px-5 py-3 text-sm font-medium text-charcoal hover:bg-mineral-light"><Search className="mr-2 size-4" /> Find materials</Link>
    </div>
    <div className="mt-8 grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl border border-white/10 bg-ink p-6"><div className="flex items-center justify-between"><p className="text-sm text-sand/50">Saved materials</p><Heart className="size-5 text-mineral" /></div><p className="mt-4 font-display text-4xl">{savedMaterials.length}</p><Link href="#saved-materials" className="mt-3 inline-block text-sm text-sand/55 hover:text-mineral">View watchlist <ArrowRight className="ml-1 inline size-4" /></Link></div>
      <div className="rounded-2xl border border-white/10 bg-ink p-6"><div className="flex items-center justify-between"><p className="text-sm text-sand/50">Quote requests</p><ClipboardList className="size-5 text-mineral" /></div><p className="mt-4 font-display text-4xl">0</p><p className="mt-3 text-sm text-sand/55">No active requests yet</p></div>
      <div className="rounded-2xl border border-mineral/30 bg-mineral p-6 text-charcoal"><div className="flex items-center justify-between"><p className="text-sm text-charcoal/60">Account status</p><ShieldCheck className="size-5" /></div><p className="mt-4 font-display text-2xl">Ready to source</p><p className="mt-3 text-sm text-charcoal/65">Complete your profile to request quotes.</p></div>
    </div>
    <section id="saved-materials" className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_.8fr]">
      <div className="rounded-2xl border border-white/10 bg-ink p-6 md:p-8"><div className="flex items-center justify-between"><div><p className="text-xs uppercase tracking-[0.2em] text-mineral">Your watchlist</p><h2 className="mt-2 font-display text-3xl">Saved materials</h2></div><Heart className="size-5 text-sand/40" /></div><div className="mt-6 divide-y divide-white/10">{savedMaterials.map((material) => <div key={material.name} className="flex flex-col justify-between gap-4 py-5 first:pt-0 sm:flex-row sm:items-center"><div><h3 className="font-display text-xl">{material.name}</h3><p className="mt-1 text-sm text-sand/50">{material.origin} · {material.grade}</p></div><div className="flex items-center gap-4"><span className="text-sm text-sand/60">{material.availability}</span><Link href="/marketplace" aria-label={`View ${material.name}`} className="grid size-9 place-items-center rounded-full border border-white/15 hover:border-mineral hover:text-mineral"><ArrowRight className="size-4" /></Link></div></div>)}</div></div>
      <div className="rounded-2xl border border-white/10 bg-ink p-6 md:p-8"><p className="text-xs uppercase tracking-[0.2em] text-mineral">Next steps</p><h2 className="mt-2 font-display text-3xl">Start sourcing</h2><div className="mt-6 space-y-5"><Link href="/marketplace" className="flex items-start gap-4 rounded-xl border border-white/10 p-4 hover:border-mineral/50"><ShoppingBag className="mt-1 size-5 text-mineral" /><span><strong className="block font-medium">Browse verified supply</strong><span className="mt-1 block text-sm leading-6 text-sand/50">Compare grades, origins, and available quantities.</span></span></Link><Link href="/contact" className="flex items-start gap-4 rounded-xl border border-white/10 p-4 hover:border-mineral/50"><FileSearch className="mt-1 size-5 text-mineral" /><span><strong className="block font-medium">Request support</strong><span className="mt-1 block text-sm leading-6 text-sand/50">Need help finding a specific material?</span></span></Link></div></div>
    </section>
  </>
}

function EmptyDashboard({ role }: { role: string }) {
  return <><p className="mt-20 text-xs uppercase tracking-[0.2em] text-mineral">Workspace</p><h1 className="mt-4 font-display text-5xl capitalize">{role} dashboard</h1><div className="mt-10 grid gap-4 md:grid-cols-3"><div className="rounded-2xl border border-white/10 bg-ink p-6"><p className="text-sm text-sand/50">Status</p><p className="mt-3 text-2xl">Ready to connect</p></div><div className="rounded-2xl border border-white/10 bg-ink p-6"><p className="text-sm text-sand/50">Data layer</p><p className="mt-3 text-2xl">Repository adapter</p></div><div className="rounded-2xl border border-mineral/30 bg-mineral p-6 text-charcoal"><p className="text-sm text-charcoal/60">Next step</p><p className="mt-3 text-2xl">Connect your account</p></div></div></>
}

export default async function DashboardPage({ params }: Props) { const { role } = await params; const normalizedRole = role.toLowerCase(); return <main className="min-h-screen bg-charcoal px-6 py-10 text-sand md:px-10"><div className="mx-auto max-w-6xl"><div className="flex items-center justify-between"><Link href="/" className="text-sm text-sand/60 hover:text-mineral">← Back to marketplace</Link><div className="flex items-center gap-4 text-sand/50"><Bell className="size-5" /><Settings className="size-5" /></div></div>{normalizedRole === 'buyer' ? <BuyerDashboard /> : <EmptyDashboard role={role} />}</div></main> }
