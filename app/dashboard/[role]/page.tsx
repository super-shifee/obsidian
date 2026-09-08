import Link from 'next/link'
import {
  ArrowRight,
  Bell,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  FileSearch,
  LayoutDashboard,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
} from 'lucide-react'

type Props = { params: Promise<{ role: string }> }

const savedMaterials = [
  { slug: 'premium-ilmenite-sand', name: 'Premium Ilmenite Sand', origin: 'Mozambique', grade: 'TiO₂ 54%+', availability: '2,500 MT', tone: 'bg-mineral/10' },
  { slug: 'high-grade-graphite', name: 'High-Grade Graphite', origin: 'Madagascar', grade: 'TGC 96%+', availability: '800 MT', tone: 'bg-sand/5' },
]

const navItems = [
  { label: 'Overview', icon: LayoutDashboard, active: true },
  { label: 'Browse materials', icon: ShoppingBag, href: '/marketplace' },
  { label: 'Quote requests', icon: ClipboardList },
  { label: 'Saved materials', icon: Bookmark, href: '#saved-materials' },
]

function BuyerDashboard() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col lg:flex-row lg:gap-10">
      <aside className="hidden w-64 shrink-0 border-r border-white/10 py-10 pr-8 lg:block">
        <div className="mb-10 flex items-center gap-3"><div className="grid size-10 place-items-center rounded-xl bg-mineral text-charcoal"><span className="font-display text-xl font-bold">B</span></div><div><p className="font-display text-lg">Black Sand</p><p className="text-xs tracking-[0.15em] text-sand/45">EXCHANGE</p></div></div>
        <p className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-sand/35">Workspace</p>
        <nav className="flex flex-col gap-2">{navItems.map(({ label, icon: Icon, href, active }) => <Link key={label} href={href ?? '#'} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${active ? 'bg-mineral text-charcoal shadow-lg shadow-mineral/10' : 'text-sand/55 hover:bg-white/5 hover:text-sand'}`}><Icon className="size-5" />{label}{label === 'Quote requests' && <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-xs">0</span>}</Link>)}</nav>
        <div className="mt-auto pt-20"><div className="rounded-2xl border border-mineral/20 bg-mineral/10 p-5"><Sparkles className="size-5 text-mineral" /><p className="mt-4 font-display text-lg">Need a hand sourcing?</p><p className="mt-2 text-sm leading-6 text-sand/50">Our trade desk can help you find the right supply.</p><Link href="/contact" className="mt-4 inline-flex items-center text-sm font-medium text-mineral">Talk to trade desk <ArrowRight className="ml-2 size-4" /></Link></div></div>
      </aside>

      <div className="min-w-0 flex-1 py-8 lg:py-10">
        <div className="flex items-center justify-between"><div className="flex items-center gap-3 lg:hidden"><button aria-label="Open navigation" className="grid size-10 place-items-center rounded-xl border border-white/10"><Menu className="size-5" /></button><span className="font-display text-xl">Black Sand</span></div><div className="hidden lg:block"><p className="text-sm text-sand/45">Tuesday, September 9, 2026</p></div><div className="ml-auto flex items-center gap-3"><button aria-label="Search" className="grid size-10 place-items-center rounded-xl border border-white/10 text-sand/55 hover:text-mineral"><Search className="size-5" /></button><button aria-label="Notifications" className="relative grid size-10 place-items-center rounded-xl border border-white/10 text-sand/55 hover:text-mineral"><Bell className="size-5" /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-mineral" /></button><button aria-label="Settings" className="hidden size-10 place-items-center rounded-xl border border-white/10 text-sand/55 hover:text-mineral sm:grid"><Settings className="size-5" /></button><div className="grid size-10 place-items-center rounded-xl bg-sand/10 font-medium text-mineral">JD</div></div></div>

        <div className="mt-12 flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="text-sm font-medium text-mineral">Buyer workspace</p><h1 className="mt-3 max-w-2xl font-display text-5xl leading-[1.05] tracking-tight md:text-6xl">Good morning, <em className="text-mineral">Jordan.</em></h1><p className="mt-5 max-w-xl text-base leading-7 text-sand/55 md:text-lg">Everything you need to source verified minerals with confidence.</p></div><Link href="/marketplace" className="inline-flex h-12 items-center justify-center rounded-xl bg-mineral px-6 text-sm font-semibold text-charcoal shadow-xl shadow-mineral/10 transition hover:bg-mineral-light"><Search className="mr-2 size-4" /> Explore materials</Link></div>

        <div className="mt-12 grid gap-4 md:grid-cols-3"><div className="rounded-2xl border border-white/10 bg-ink p-6 md:p-7"><div className="flex items-center justify-between"><p className="text-sm font-medium text-sand/55">Saved materials</p><Bookmark className="size-5 text-mineral" /></div><div className="mt-6 flex items-end justify-between"><p className="font-display text-5xl">{savedMaterials.length}</p><span className="mb-1 inline-flex items-center gap-1 text-xs text-mineral"><TrendingUp className="size-3" /> Active</span></div><Link href="#saved-materials" className="mt-5 inline-flex items-center text-sm text-sand/55 hover:text-mineral">View watchlist <ArrowRight className="ml-2 size-4" /></Link></div><div className="rounded-2xl border border-white/10 bg-ink p-6 md:p-7"><div className="flex items-center justify-between"><p className="text-sm font-medium text-sand/55">Open quote requests</p><ClipboardList className="size-5 text-mineral" /></div><p className="mt-6 font-display text-5xl">0</p><p className="mt-5 text-sm text-sand/45">No active requests yet</p></div><div className="rounded-2xl bg-mineral p-6 text-charcoal shadow-xl shadow-mineral/10 md:p-7"><div className="flex items-center justify-between"><p className="text-sm font-medium text-charcoal/65">Profile strength</p><ShieldCheck className="size-5" /></div><p className="mt-6 font-display text-5xl">40<span className="text-2xl">%</span></p><div className="mt-5 h-1.5 overflow-hidden rounded-full bg-charcoal/15"><div className="h-full w-2/5 rounded-full bg-charcoal" /></div><Link href="#profile" className="mt-4 inline-flex items-center text-sm font-medium text-charcoal/70 hover:text-charcoal">Complete your profile <ArrowRight className="ml-2 size-4" /></Link></div></div>

        <div className="mt-12 grid gap-8 xl:grid-cols-[1.35fr_.75fr]"><section id="saved-materials" className="rounded-2xl border border-white/10 bg-ink p-6 md:p-8"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-mineral">Your watchlist</p><h2 className="mt-3 font-display text-3xl md:text-4xl">Saved materials</h2><p className="mt-2 text-sm text-sand/45">Materials you are keeping an eye on.</p></div><button className="inline-flex items-center gap-2 self-start rounded-lg border border-white/10 px-3 py-2 text-sm text-sand/60 hover:border-mineral/50 hover:text-sand"><SlidersHorizontal className="size-4" /> Filter</button></div><div className="mt-8 flex flex-col gap-3">{savedMaterials.map((material) => <div key={material.name} className={`group flex flex-col justify-between gap-5 rounded-xl border border-white/10 p-5 transition hover:border-mineral/40 sm:flex-row sm:items-center ${material.tone}`}><div className="flex items-center gap-4"><div className="grid size-12 shrink-0 place-items-center rounded-xl border border-white/10 bg-charcoal text-mineral"><ShoppingBag className="size-5" /></div><div><h3 className="font-display text-xl md:text-2xl">{material.name}</h3><div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-sand/50"><span>{material.origin}</span><span className="text-mineral">•</span><span>{material.grade}</span></div></div></div><div className="flex items-center justify-between gap-5 sm:justify-end"><div className="text-left sm:text-right"><p className="text-xs uppercase tracking-wider text-sand/35">Available</p><p className="mt-1 text-sm font-medium text-sand/75">{material.availability}</p></div><Link href={`/materials/${material.slug}`} aria-label={`View ${material.name} details`} className="grid size-10 place-items-center rounded-full border border-white/15 text-sand/55 transition group-hover:border-mineral group-hover:text-mineral"><ChevronRight className="size-5" /></Link></div></div>)}</div><Link href="/marketplace" className="mt-6 flex items-center justify-center rounded-xl border border-dashed border-white/15 py-4 text-sm text-sand/50 transition hover:border-mineral/50 hover:text-mineral">Browse more verified materials <ArrowRight className="ml-2 size-4" /></Link></section>

          <div className="flex flex-col gap-8"><section id="profile" className="rounded-2xl border border-white/10 bg-ink p-6 md:p-8"><div className="flex items-start justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-mineral">Account setup</p><h2 className="mt-3 font-display text-3xl">Build trust faster</h2></div><span className="font-display text-2xl text-mineral">40%</span></div><p className="mt-3 text-sm leading-6 text-sand/50">A complete profile helps suppliers respond to your quote requests.</p><div className="mt-6 flex flex-col gap-3"><div className="flex items-center gap-3 text-sm"><CheckCircle2 className="size-5 text-mineral" /><span>Account created</span></div><div className="flex items-center gap-3 text-sm text-sand/45"><span className="grid size-5 place-items-center rounded-full border border-sand/20 text-xs">2</span><span>Add company details</span></div><div className="flex items-center gap-3 text-sm text-sand/45"><span className="grid size-5 place-items-center rounded-full border border-sand/20 text-xs">3</span><span>Verify your business</span></div></div><Link href="#" className="mt-6 inline-flex items-center justify-center rounded-xl border border-mineral/40 py-3 text-sm font-medium text-mineral hover:bg-mineral/10">Complete profile <ArrowRight className="ml-2 size-4" /></Link></section><section className="rounded-2xl border border-white/10 bg-ink p-6 md:p-8"><FileSearch className="size-6 text-mineral" /><h2 className="mt-4 font-display text-2xl">Looking for something specific?</h2><p className="mt-2 text-sm leading-6 text-sand/50">Tell our trade desk what you need and we will help source it.</p><Link href="/contact" className="mt-5 inline-flex items-center text-sm font-medium text-mineral">Contact trade desk <ArrowRight className="ml-2 size-4" /></Link></section></div></div>
      </div>
    </div>
  )
}

function EmptyDashboard({ role }: { role: string }) { return <><p className="mt-20 text-xs uppercase tracking-[0.2em] text-mineral">Workspace</p><h1 className="mt-4 font-display text-5xl capitalize">{role} dashboard</h1><div className="mt-10 grid gap-4 md:grid-cols-3"><div className="rounded-2xl border border-white/10 bg-ink p-6"><p className="text-sm text-sand/50">Status</p><p className="mt-3 text-2xl">Ready to connect</p></div><div className="rounded-2xl border border-white/10 bg-ink p-6"><p className="text-sm text-sand/50">Data layer</p><p className="mt-3 text-2xl">Repository adapter</p></div><div className="rounded-2xl border border-mineral/30 bg-mineral p-6 text-charcoal"><p className="text-sm text-charcoal/60">Next step</p><p className="mt-3 text-2xl">Connect your account</p></div></div></> }

export default async function DashboardPage({ params }: Props) { const { role } = await params; const normalizedRole = role.toLowerCase(); return <main className="min-h-screen bg-charcoal px-5 text-sand md:px-8 lg:px-10"><div className="mx-auto max-w-[1440px]"><div className="flex h-20 items-center justify-between border-b border-white/10"><Link href="/" className="text-sm text-sand/55 transition hover:text-mineral">← Back to marketplace</Link><div className="hidden text-xs uppercase tracking-[0.18em] text-sand/35 sm:block">Verified mineral trade</div></div>{normalizedRole === 'buyer' ? <BuyerDashboard /> : <EmptyDashboard role={role} />}</div></main> }
