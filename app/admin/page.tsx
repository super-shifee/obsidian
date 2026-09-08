import Link from 'next/link'
import { getAdminOverview } from '@/app/actions/admin'

function formatDate(date: Date | null) {
  if (!date) return '—'
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date))
}

export default async function AdminPage() {
  let data: Awaited<ReturnType<typeof getAdminOverview>> | null = null
  let accessDenied = false
  try { data = await getAdminOverview() } catch { accessDenied = true }

  if (accessDenied || !data) {
    return (
      <main className="min-h-screen bg-charcoal px-6 py-12 text-sand sm:px-10">
        <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col justify-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-mineral">Black Sand / Admin</p>
          <h1 className="font-display text-5xl leading-[0.95] sm:text-7xl">Restricted workspace.</h1>
          <p className="mt-6 max-w-md text-base leading-7 text-sand/65">This area is reserved for authorized administrators. Sign in with an approved admin account to manage products, requests, and marketplace users.</p>
          <Link href="/sign-in?redirect=%2Fadmin" className="mt-8 inline-flex w-fit rounded-full bg-mineral px-6 py-3 text-sm font-semibold text-charcoal transition hover:bg-mineral-light">Sign in to admin</Link>
        </div>
      </main>
    )
  }

  const available = data.products.filter((product) => product.availability === 'available').length
  const pendingRequests = data.requests.filter(({ request }) => request.status === 'pending').length

  return (
    <main className="min-h-screen bg-charcoal text-sand">
      <header className="border-b border-sand/10 px-6 py-5 sm:px-10">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-5">
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-mineral">Black Sand / Control room</p><h1 className="mt-2 font-display text-3xl">Admin dashboard</h1></div>
          <nav className="flex items-center gap-3 text-sm text-sand/65"><Link href="/marketplace" className="transition hover:text-sand">Marketplace</Link><Link href="/dashboard/seller" className="transition hover:text-sand">Seller view</Link></nav>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1500px] gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block"><div className="sticky top-8 flex flex-col gap-2 text-sm"><p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-sand/35">Workspace</p><a href="#overview" className="rounded-xl bg-sand/10 px-4 py-3 text-sand">Overview</a><a href="#products" className="rounded-xl px-4 py-3 text-sand/55 transition hover:bg-sand/5 hover:text-sand">Products</a><a href="#requests" className="rounded-xl px-4 py-3 text-sand/55 transition hover:bg-sand/5 hover:text-sand">Requests</a><a href="#users" className="rounded-xl px-4 py-3 text-sand/55 transition hover:bg-sand/5 hover:text-sand">Users</a></div></aside>
        <section className="min-w-0" id="overview">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm text-sand/45">Live marketplace overview</p><h2 className="mt-2 font-display text-4xl sm:text-5xl">Good morning, operator.</h2></div><p className="text-sm text-sand/45">Synced {formatDate(new Date())}</p></div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Stat label="Total products" value={data.products.length} detail={`${available} currently available`} /><Stat label="Marketplace users" value={data.users.length} detail="Registered accounts" /><Stat label="Pending requests" value={pendingRequests} detail="Need attention" /><Stat label="Active supply" value={available} detail="Visible to buyers" /></div>
          <section id="products" className="mt-10 rounded-3xl border border-sand/10 bg-ink/70 p-5 sm:p-7"><div className="mb-5 flex items-center justify-between gap-4"><div><h3 className="font-display text-2xl">Product inventory</h3><p className="mt-1 text-sm text-sand/45">Manage the single source of truth for buyer listings.</p></div><Link href="/dashboard/seller/new" className="rounded-full border border-mineral/50 px-4 py-2 text-xs font-semibold text-mineral transition hover:bg-mineral hover:text-charcoal">Add product</Link></div><div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead className="border-b border-sand/10 text-[10px] uppercase tracking-[0.2em] text-sand/35"><tr><th className="pb-3 pr-4 font-medium">Product</th><th className="pb-3 pr-4 font-medium">Seller</th><th className="pb-3 pr-4 font-medium">Price</th><th className="pb-3 pr-4 font-medium">Quantity</th><th className="pb-3 font-medium">Status</th></tr></thead><tbody className="divide-y divide-sand/10">{data.products.map((product) => <tr key={product.id}><td className="py-4 pr-4"><p className="font-medium">{product.name}</p><p className="mt-1 text-xs text-sand/40">{product.category} · {product.country}</p></td><td className="py-4 pr-4 text-sand/65">{product.sellerCompany}</td><td className="py-4 pr-4 font-medium text-mineral">{product.currency} {product.price}/{product.unit}</td><td className="py-4 pr-4 text-sand/65">{product.quantity} {product.unit}</td><td className="py-4"><span className="rounded-full border border-sand/15 px-3 py-1 text-xs text-sand/65">{product.availability}</span></td></tr>)}</tbody></table>{data.products.length === 0 && <p className="py-10 text-center text-sm text-sand/45">No products have been published yet.</p>}</div></section>
          <section id="requests" className="mt-6 rounded-3xl border border-sand/10 bg-ink/70 p-5 sm:p-7"><h3 className="font-display text-2xl">Recent purchase requests</h3><div className="mt-5 grid gap-3">{data.requests.slice(0, 5).map(({ request, product }) => <div key={request.id} className="flex flex-col justify-between gap-3 rounded-2xl border border-sand/10 bg-charcoal/50 p-4 sm:flex-row sm:items-center"><div><p className="font-medium">{request.buyerName} · {product.name}</p><p className="mt-1 text-xs text-sand/45">{request.requestedQuantity} requested · {formatDate(request.createdAt)}</p></div><span className="w-fit rounded-full bg-mineral/15 px-3 py-1 text-xs text-mineral">{request.status}</span></div>)}{data.requests.length === 0 && <p className="text-sm text-sand/45">No buyer requests yet.</p>}</div></section>
          <section id="users" className="mt-6 rounded-3xl border border-sand/10 bg-ink/70 p-5 sm:p-7"><h3 className="font-display text-2xl">Recent users</h3><div className="mt-5 grid gap-3 sm:grid-cols-2">{data.users.slice(0, 6).map((user) => <div key={user.id} className="rounded-2xl border border-sand/10 p-4"><p className="font-medium">{user.name || 'Unnamed account'}</p><p className="mt-1 text-xs text-sand/45">{user.email} · Joined {formatDate(user.createdAt)}</p></div>)}</div></section>
        </section>
      </div>
    </main>
  )
}

function Stat({ label, value, detail }: { label: string; value: number; detail: string }) {
  return <div className="rounded-3xl border border-sand/10 bg-ink/70 p-5"><p className="text-xs uppercase tracking-[0.18em] text-sand/40">{label}</p><p className="mt-5 font-display text-5xl text-mineral">{value}</p><p className="mt-2 text-xs text-sand/45">{detail}</p></div>
}
