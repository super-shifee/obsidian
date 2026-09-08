import Link from 'next/link'
import { ProductForm } from '@/components/seller/product-form'

export default function NewSellerProductPage() {
  return <main className="min-h-screen bg-charcoal px-5 text-sand md:px-8 lg:px-10"><div className="mx-auto max-w-4xl"><header className="flex h-20 items-center justify-between border-b border-white/10"><Link href="/dashboard/seller" className="text-sm text-sand/55 hover:text-mineral">← Seller dashboard</Link><span className="text-xs uppercase tracking-[0.18em] text-sand/35">New listing</span></header><div className="py-12"><p className="text-sm font-medium text-mineral">Product catalog</p><h1 className="mt-3 font-display text-5xl">Add a mineral listing</h1><p className="mt-4 max-w-2xl text-lg leading-8 text-sand/55">Give buyers the technical detail and confidence they need to start a conversation.</p><ProductForm /></div></div></main>
}
