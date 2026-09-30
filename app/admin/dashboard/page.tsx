import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { Activity, ArrowUpRight, CheckCircle2, Clock3, Package, ShieldCheck, Users } from 'lucide-react'
import { auth } from '@/lib/auth'

const metrics = [
  ['Total users', '1,284', '+12.4%', Users],
  ['Verified sellers', '86', '+8.2%', ShieldCheck],
  ['Live products', '342', '+18.6%', Package],
  ['Pending approvals', '17', 'Needs review', Clock3],
] as const

export default async function AdminDashboardRoute() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in?redirect=/admin/dashboard')
  if ((session.user.role ?? 'BUYER') !== 'ADMIN') redirect(`/${(session.user.role ?? 'BUYER').toLowerCase()}/dashboard`)

  return <main className="min-h-screen bg-charcoal px-5 py-8 text-sand md:px-10 lg:px-14"><div className="mx-auto max-w-7xl">
    <header className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end"><div><p className="eyebrow">Control center</p><h1 className="mt-3 font-display text-4xl md:text-5xl">Marketplace overview.</h1><p className="mt-3 text-sand/55">Keep the supply network trusted, active, and moving.</p></div><div className="flex items-center gap-3 text-sm text-sand/55"><span className="size-2 rounded-full bg-success" /> All systems operational</div></header>
    <section className="grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4">{metrics.map(([label, value, detail, Icon]) => <article key={label} className="surface p-5"><div className="flex items-start justify-between"><p className="text-sm text-sand/55">{label}</p><Icon className="size-5 text-mineral" /></div><p className="mt-6 text-3xl font-semibold tracking-tight">{value}</p><p className="mt-2 text-xs text-success">{detail}</p></article>)}</section>
    <section className="grid gap-5 lg:grid-cols-[1.35fr_.65fr]"><article className="surface p-6 md:p-7"><div className="flex items-center justify-between"><div><p className="eyebrow">Activity</p><h2 className="mt-2 text-xl font-semibold">Marketplace activity</h2></div><button className="text-sm text-sand/55 hover:text-mineral">View report <ArrowUpRight className="ml-1 inline size-4" /></button></div><div className="mt-8 grid grid-cols-7 items-end gap-3 border-b border-white/10 pb-4 pt-8">{[42,58,49,72,64,82,76].map((height, index) => <div key={index} className="flex flex-col items-center gap-2"><div className="w-full rounded-sm bg-mineral/80" style={{ height: `${height}px` }} /><span className="text-[11px] text-sand/35">{['M','T','W','T','F','S','S'][index]}</span></div>)}</div><div className="mt-5 flex items-center gap-2 text-sm text-sand/55"><Activity className="size-4 text-mineral" /> 18.6% more buyer activity this month</div></article>
      <article className="surface p-6 md:p-7"><p className="eyebrow">Verification queue</p><h2 className="mt-2 text-xl font-semibold">Needs attention</h2><div className="mt-6 flex flex-col gap-4">{[['Kivu Mineral Group','Seller verification'],['Black Coast Resources','Product approval'],['Asteria Materials','Seller verification']].map(([name, type]) => <div key={name} className="flex items-center justify-between border-b border-white/10 pb-4"><div><p className="text-sm font-medium">{name}</p><p className="mt-1 text-xs text-sand/45">{type}</p></div><button className="text-xs font-semibold text-mineral hover:text-mineral-light">Review</button></div>)}</div><button className="mt-6 w-full border border-white/15 px-4 py-3 text-sm font-medium hover:border-mineral hover:text-mineral">Open full queue</button></article></section>
    <section className="mt-5 grid gap-5 md:grid-cols-3"><article className="surface p-6"><p className="eyebrow">Recent transactions</p><h2 className="mt-2 text-xl font-semibold">$428,600</h2><p className="mt-2 text-sm text-sand/50">Processed this month</p></article><article className="surface p-6"><p className="eyebrow">Completed deals</p><h2 className="mt-2 text-xl font-semibold">64</h2><p className="mt-2 text-sm text-sand/50">Across 19 origins</p></article><article className="surface p-6"><p className="eyebrow">Platform health</p><h2 className="mt-2 flex items-center gap-2 text-xl font-semibold"><CheckCircle2 className="size-5 text-success" /> Excellent</h2><p className="mt-2 text-sm text-sand/50">Response time under 200ms</p></article></section>
  </div></main>
}
