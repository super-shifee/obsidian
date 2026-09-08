import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight, Bell, Boxes, FileText, Plus, ShieldCheck, TrendingUp } from 'lucide-react'
import { getSellerAnnouncements, getSellerProducts, getSellerRequests } from '@/app/actions/marketplace'

function formatDate(value: Date | string) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
}

export default async function SellerDashboard() {
  try {
    const [products, requests, announcements] = await Promise.all([
      getSellerProducts(),
      getSellerRequests(),
      getSellerAnnouncements(),
    ])
    const active = products.filter((product) => product.availability === 'available' && Number(product.quantity) > 0).length
    const lowStock = products.filter((product) => Number(product.quantity) > 0 && Number(product.quantity) <= 10).length

    return (
      <main className="min-h-screen bg-charcoal px-5 text-sand md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <header className="flex h-20 items-center justify-between border-b border-white/10">
            <Link href="/" className="text-sm text-sand/55 transition hover:text-mineral">← Back to marketplace</Link>
            <span className="text-xs uppercase tracking-[0.18em] text-sand/35">Seller workspace</span>
          </header>
          <section className="py-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div><p className="text-sm font-medium text-mineral">Supplier console</p><h1 className="mt-3 font-display text-5xl tracking-tight md:text-6xl">Manage your supply.</h1><p className="mt-4 max-w-xl text-lg leading-8 text-sand/55">Keep listings, availability, and buyer demand current from one focused workspace.</p></div>
              <Link href="/dashboard/seller/new" className="inline-flex items-center justify-center rounded-xl bg-mineral px-6 py-3 font-semibold text-charcoal transition hover:bg-mineral-light"><Plus className="mr-2 size-5" /> Add product</Link>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-4">
              {([['Active listings', active, Boxes], ['Total listings', products.length, TrendingUp], ['Buyer inquiries', requests.length, FileText], ['Low stock', lowStock, ShieldCheck]] as [string, number, LucideIcon][]).map(([label, value, Icon]) => (
                <div key={label as string} className="rounded-2xl border border-white/10 bg-ink p-6"><Icon className="size-5 text-mineral" /><p className="mt-5 text-sm text-sand/50">{label as string}</p><p className="mt-2 font-display text-4xl">{value as number}</p></div>
              ))}
            </div>
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
              <section className="rounded-2xl border border-white/10 bg-ink p-6 md:p-8"><div className="flex items-center justify-between"><div><p className="text-xs uppercase tracking-[0.18em] text-mineral">Catalog</p><h2 className="mt-2 font-display text-3xl">Your products</h2></div><Link href="/marketplace" className="text-sm text-sand/50 hover:text-mineral">View marketplace <ArrowRight className="ml-1 inline size-4" /></Link></div>
                {products.length === 0 ? <div className="mt-10 rounded-xl border border-dashed border-white/15 p-10 text-center"><p className="text-lg">Your catalog is ready for its first listing.</p><Link href="/dashboard/seller/new" className="mt-4 inline-block text-sm text-mineral">Create a product →</Link></div> : <div className="mt-8 overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead className="border-b border-white/10 text-xs uppercase tracking-[0.14em] text-sand/35"><tr><th className="pb-4 font-medium">Product</th><th className="pb-4 font-medium">Price / {products[0]?.unit ?? 'MT'}</th><th className="pb-4 font-medium">Quantity</th><th className="pb-4 font-medium">Status</th><th className="pb-4" /></tr></thead><tbody>{products.map((product) => <tr key={product.id} className="border-b border-white/5"><td className="py-5"><p className="font-medium">{product.name}</p><p className="mt-1 text-xs text-sand/40">{product.country} · {product.region}</p></td><td className="py-5">{product.currency} {Number(product.price).toLocaleString()}</td><td className="py-5">{Number(product.quantity).toLocaleString()} {product.unit}</td><td className="py-5"><span className={`rounded-full px-3 py-1 text-xs ${product.availability === 'available' && Number(product.quantity) > 0 ? 'bg-mineral/15 text-mineral' : 'bg-white/10 text-sand/50'}`}>{product.availability === 'available' && Number(product.quantity) > 0 ? 'Available' : 'Unavailable'}</span></td><td className="py-5 text-right"><Link href={`/dashboard/seller/${product.id}/edit`} className="text-sand/50 hover:text-mineral">Edit</Link></td></tr>)}</tbody></table></div>}
              </section>
              <aside className="flex flex-col gap-8"><section className="rounded-2xl border border-white/10 bg-ink p-6"><div className="flex items-center gap-3"><Bell className="size-5 text-mineral" /><div><p className="text-xs uppercase tracking-[0.14em] text-mineral">Announcements</p><h2 className="mt-1 font-display text-2xl">Buyer updates</h2></div></div>{announcements.length === 0 ? <p className="mt-6 text-sm leading-6 text-sand/45">Share availability changes, shipment notes, or new certifications with interested buyers.</p> : <div className="mt-6 flex flex-col gap-4">{announcements.slice(0, 3).map((item) => <div key={item.id} className="border-l border-mineral/50 pl-4"><p className="font-medium">{item.title}</p><p className="mt-1 text-xs leading-5 text-sand/45">{item.message}</p><p className="mt-2 text-[11px] text-sand/30">{formatDate(item.createdAt)}</p></div>)}</div>}</section><section className="rounded-2xl border border-mineral/20 bg-mineral p-6 text-charcoal"><p className="text-xs uppercase tracking-[0.14em] text-charcoal/55">Demand signal</p><p className="mt-3 font-display text-4xl">{requests.length}</p><p className="mt-2 text-sm leading-6 text-charcoal/65">buyer requests connected to your catalog</p><Link href="/dashboard/seller/requests" className="mt-5 inline-flex items-center text-sm font-semibold">Review inquiries <ArrowRight className="ml-2 size-4" /></Link></section></aside>
            </div>
          </section>
        </div>
      </main>
    )
  } catch {
    return <main className="min-h-screen bg-charcoal px-5 py-24 text-center text-sand"><p className="text-sm text-mineral">Seller workspace</p><h1 className="mt-4 font-display text-5xl">Sign in to manage your supply.</h1><p className="mx-auto mt-4 max-w-lg text-lg leading-8 text-sand/55">Your product listings and buyer inquiries are protected behind your seller account.</p><Link href="/sign-in?redirect=/dashboard/seller" className="mt-8 inline-flex rounded-xl bg-mineral px-6 py-3 font-semibold text-charcoal">Sign in</Link></main>
  }
}
