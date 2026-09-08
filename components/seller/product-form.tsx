'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSellerProduct, updateSellerProduct, type SellerProductInput } from '@/app/actions/marketplace'

type ProductFormProps = { product?: Partial<SellerProductInput> & { id?: string } }

const fields = [
  ['name', 'Product name', 'Premium Ilmenite Sand'],
  ['slug', 'URL slug', 'premium-ilmenite-sand'],
  ['category', 'Category', 'Black Sand'],
  ['mineralContent', 'Mineral content', 'Titanium, iron, vanadium'],
  ['grade', 'Grade / specification', 'TiO₂ 54%+'],
  ['country', 'Country of origin', 'Mozambique'],
  ['region', 'Origin region', 'Nampula'],
  ['quantity', 'Available quantity', '2500'],
  ['unit', 'Unit', 'MT'],
  ['price', 'Indicative price per unit', '0'],
  ['currency', 'Currency', 'USD'],
] as const

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const value = (key: string) => String(product?.[key as keyof ProductFormProps['product']] ?? '')

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setPending(true)
    const form = new FormData(event.currentTarget)
    const data = {
      name: String(form.get('name') || ''), slug: String(form.get('slug') || ''), category: String(form.get('category') || 'Black Sand'),
      description: String(form.get('description') || ''), quantity: Number(form.get('quantity')), unit: String(form.get('unit') || 'MT'), price: Number(form.get('price')), currency: String(form.get('currency') || 'USD'), availability: String(form.get('availability') || 'available'),
      mineralContent: String(form.get('mineralContent') || ''), grade: String(form.get('grade') || ''), country: String(form.get('country') || ''), region: String(form.get('region') || ''), sellerName: String(form.get('sellerName') || ''), sellerCompany: String(form.get('sellerCompany') || ''),
    } satisfies SellerProductInput
    try { if (product?.id) await updateSellerProduct(product.id, data); else await createSellerProduct(data); router.push('/dashboard/seller'); router.refresh() } catch (caught) { setError(caught instanceof Error ? caught.message : 'We could not save this listing.') } finally { setPending(false) }
  }

  return <form onSubmit={submit} className="mt-10 flex flex-col gap-8">
    <section className="rounded-2xl border border-white/10 bg-ink p-6 md:p-8"><h2 className="font-display text-2xl">Core listing details</h2><div className="mt-6 grid gap-5 md:grid-cols-2">{fields.map(([name, label, placeholder]) => <label key={name} className="flex flex-col gap-2 text-sm text-sand/65">{label}<input required={['name','slug','quantity','mineralContent','grade','country','sellerCompany'].includes(name)} name={name} defaultValue={value(name)} placeholder={placeholder} type={['quantity','price'].includes(name) ? 'number' : 'text'} min={['quantity','price'].includes(name) ? 0 : undefined} className="rounded-xl border border-white/10 bg-charcoal px-4 py-3 text-base text-sand outline-none focus:border-mineral" /></label>)}</div><label className="mt-5 flex flex-col gap-2 text-sm text-sand/65">Description<textarea required name="description" defaultValue={value('description')} rows={5} placeholder="Describe quality, processing, packaging, and buyer use cases" className="rounded-xl border border-white/10 bg-charcoal px-4 py-3 text-base text-sand outline-none focus:border-mineral" /></label><label className="mt-5 flex flex-col gap-2 text-sm text-sand/65">Availability<select name="availability" defaultValue={value('availability') || 'available'} className="rounded-xl border border-white/10 bg-charcoal px-4 py-3 text-base text-sand outline-none focus:border-mineral"><option value="available">Available</option><option value="limited">Limited availability</option><option value="unavailable">Unavailable</option></select></label></section>
    <section className="rounded-2xl border border-white/10 bg-ink p-6 md:p-8"><h2 className="font-display text-2xl">Seller identity</h2><div className="mt-6 grid gap-5 md:grid-cols-2"><label className="flex flex-col gap-2 text-sm text-sand/65">Contact name<input required name="sellerName" defaultValue={value('sellerName')} placeholder="Your name" className="rounded-xl border border-white/10 bg-charcoal px-4 py-3 text-base text-sand outline-none focus:border-mineral" /></label><label className="flex flex-col gap-2 text-sm text-sand/65">Company<input required name="sellerCompany" defaultValue={value('sellerCompany')} placeholder="Company name" className="rounded-xl border border-white/10 bg-charcoal px-4 py-3 text-base text-sand outline-none focus:border-mineral" /></label></div></section>
    {error && <p role="alert" className="rounded-xl border border-red-300/20 bg-red-300/10 px-4 py-3 text-sm text-red-200">{error}</p>}
    <div className="flex items-center justify-end gap-4"><button type="button" onClick={() => router.back()} className="rounded-xl px-5 py-3 text-sm text-sand/55 hover:text-sand">Cancel</button><button disabled={pending} className="rounded-xl bg-mineral px-6 py-3 font-semibold text-charcoal disabled:opacity-50">{pending ? 'Saving…' : product?.id ? 'Save changes' : 'Publish listing'}</button></div>
  </form>
}
