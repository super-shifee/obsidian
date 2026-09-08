'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { deleteAdminProduct, updateAdminProduct, updateAdminRequest } from '@/app/actions/admin'

type Product = {
  id: string
  name: string
  category: string
  country: string
  currency: string
  price: string
  quantity: string
  unit: string
  availability: string
}

type RequestItem = {
  request: {
    id: string
    buyerName: string
    requestedQuantity: string
    status: string
    sellerResponse: string | null
  }
  product: { name: string }
}

export function AdminWorkspace({ products, requests }: { products: Product[]; requests: RequestItem[] }) {
  const [isPending, startTransition] = useTransition()
  const [editing, setEditing] = useState<Product | null>(null)
  const [requestStatus, setRequestStatus] = useState<Record<string, string>>({})
  const [message, setMessage] = useState('')

  function saveProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!editing) return
    const form = new FormData(event.currentTarget)
    setMessage('')
    startTransition(async () => {
      try {
        await updateAdminProduct(editing.id, {
          name: String(form.get('name') ?? ''),
          category: String(form.get('category') ?? ''),
          price: Number(form.get('price')),
          quantity: Number(form.get('quantity')),
          availability: String(form.get('availability') ?? 'available'),
        })
        setEditing(null)
        setMessage('Product updated.')
      } catch {
        setMessage('Could not update this product.')
      }
    })
  }

  function removeProduct(id: string) {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    startTransition(async () => {
      try {
        await deleteAdminProduct(id)
        setMessage('Product deleted.')
      } catch {
        setMessage('Could not delete this product.')
      }
    })
  }

  function changeRequest(id: string, status: string) {
    setRequestStatus((current) => ({ ...current, [id]: status }))
    startTransition(async () => {
      try {
        await updateAdminRequest(id, status)
        setMessage('Request status updated.')
      } catch {
        setMessage('Could not update this request.')
      }
    })
  }

  return (
    <>
      {message && <p className="mb-5 rounded-2xl border border-mineral/30 bg-mineral/10 px-4 py-3 text-sm text-mineral" role="status">{message}</p>}
      <section id="products" className="rounded-3xl border border-sand/10 bg-ink/70 p-5 sm:p-7">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div><h3 className="font-display text-2xl">Product inventory</h3><p className="mt-1 text-sm text-sand/45">Manage the single source of truth for buyer listings.</p></div>
          <Link href="/dashboard/seller/new" className="rounded-full border border-mineral/50 px-4 py-2 text-xs font-semibold text-mineral transition hover:bg-mineral hover:text-charcoal">Add product</Link>
        </div>
        <div className="overflow-x-auto"><table className="w-full min-w-[820px] text-left text-sm"><thead className="border-b border-sand/10 text-[10px] uppercase tracking-[0.2em] text-sand/35"><tr><th className="pb-3 pr-4 font-medium">Product</th><th className="pb-3 pr-4 font-medium">Seller</th><th className="pb-3 pr-4 font-medium">Price</th><th className="pb-3 pr-4 font-medium">Quantity</th><th className="pb-3 pr-4 font-medium">Status</th><th className="pb-3 font-medium">Actions</th></tr></thead><tbody className="divide-y divide-sand/10">{products.map((product) => <tr key={product.id}><td className="py-4 pr-4"><p className="font-medium">{product.name}</p><p className="mt-1 text-xs text-sand/40">{product.category} · {product.country}</p></td><td className="py-4 pr-4 text-sand/65">{(product as Product & { sellerCompany?: string }).sellerCompany || 'Marketplace seller'}</td><td className="py-4 pr-4 font-medium text-mineral">{product.currency} {product.price}/{product.unit}</td><td className="py-4 pr-4 text-sand/65">{product.quantity} {product.unit}</td><td className="py-4 pr-4"><span className="rounded-full border border-sand/15 px-3 py-1 text-xs text-sand/65">{product.availability}</span></td><td className="py-4"><div className="flex items-center gap-2"><button type="button" onClick={() => setEditing(product)} className="rounded-full border border-sand/20 px-3 py-1.5 text-xs transition hover:border-mineral hover:text-mineral">Edit</button><button type="button" disabled={isPending} onClick={() => removeProduct(product.id)} className="rounded-full border border-red-300/20 px-3 py-1.5 text-xs text-red-200 transition hover:border-red-300/60 disabled:opacity-50">Delete</button></div></td></tr>)}</tbody></table>{products.length === 0 && <p className="py-10 text-center text-sm text-sand/45">No products have been published yet.</p>}</div>
      </section>

      <section id="requests" className="mt-6 rounded-3xl border border-sand/10 bg-ink/70 p-5 sm:p-7"><h3 className="font-display text-2xl">Recent purchase requests</h3><div className="mt-5 grid gap-3">{requests.slice(0, 8).map(({ request, product }) => { const status = requestStatus[request.id] || request.status; return <div key={request.id} className="flex flex-col justify-between gap-4 rounded-2xl border border-sand/10 bg-charcoal/50 p-4 sm:flex-row sm:items-center"><div><p className="font-medium">{request.buyerName} · {product.name}</p><p className="mt-1 text-xs text-sand/45">{request.requestedQuantity} requested</p></div><select aria-label={`Status for ${request.buyerName}`} value={status} disabled={isPending} onChange={(event) => changeRequest(request.id, event.target.value)} className="rounded-full border border-sand/15 bg-charcoal px-3 py-2 text-xs text-sand"><option value="pending">Pending</option><option value="accepted">Accepted</option><option value="rejected">Rejected</option><option value="completed">Completed</option></select></div> })}{requests.length === 0 && <p className="text-sm text-sand/45">No buyer requests yet.</p>}</div></section>

      {editing && <div className="fixed inset-0 z-50 grid place-items-center bg-charcoal/80 p-4" role="dialog" aria-modal="true" aria-labelledby="edit-product-title"><form onSubmit={saveProduct} className="w-full max-w-lg rounded-3xl border border-sand/15 bg-ink p-6 shadow-2xl"><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] uppercase tracking-[0.25em] text-mineral">Admin edit</p><h2 id="edit-product-title" className="mt-2 font-display text-3xl">Update product</h2></div><button type="button" onClick={() => setEditing(null)} className="text-2xl leading-none text-sand/50" aria-label="Close edit dialog">×</button></div><div className="mt-6 grid gap-4"><label className="grid gap-2 text-sm">Name<input name="name" defaultValue={editing.name} required className="rounded-xl border border-sand/15 bg-charcoal px-3 py-2 text-sand" /></label><label className="grid gap-2 text-sm">Black Sand type<input name="category" defaultValue={editing.category} required className="rounded-xl border border-sand/15 bg-charcoal px-3 py-2 text-sand" /></label><div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm">Price<input name="price" type="number" min="0" step="0.01" defaultValue={editing.price} required className="rounded-xl border border-sand/15 bg-charcoal px-3 py-2 text-sand" /></label><label className="grid gap-2 text-sm">Quantity<input name="quantity" type="number" min="0" step="0.01" defaultValue={editing.quantity} required className="rounded-xl border border-sand/15 bg-charcoal px-3 py-2 text-sand" /></label></div><label className="grid gap-2 text-sm">Availability<select name="availability" defaultValue={editing.availability} className="rounded-xl border border-sand/15 bg-charcoal px-3 py-2 text-sand"><option value="available">Available</option><option value="unavailable">Unavailable</option><option value="draft">Draft</option></select></label></div><div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setEditing(null)} className="rounded-full border border-sand/15 px-4 py-2 text-sm">Cancel</button><button type="submit" disabled={isPending} className="rounded-full bg-mineral px-5 py-2 text-sm font-semibold text-charcoal disabled:opacity-50">{isPending ? 'Saving…' : 'Save changes'}</button></div></form></div>}
    </>
  )
}

export type { Product, RequestItem }
EOF
