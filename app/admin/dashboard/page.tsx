import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'

export default async function AdminDashboardRoute() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in?redirect=/admin/dashboard')
  if ((session.user.role ?? 'BUYER') !== 'ADMIN') redirect(`/${(session.user.role ?? 'BUYER').toLowerCase()}/dashboard`)
  return <main className="min-h-screen bg-charcoal px-6 py-24 text-sand"><div className="mx-auto max-w-5xl"><p className="text-sm font-medium text-mineral">Admin workspace</p><h1 className="mt-3 font-display text-5xl">Operations overview.</h1><p className="mt-5 text-sand/55">Manage verified users, listings, and marketplace activity.</p></div></main>
}
