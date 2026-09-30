import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'

export default async function SellerDashboardRoute() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in?redirect=/seller/dashboard')
  if ((session.user.role ?? 'BUYER') !== 'SELLER') redirect(`/${(session.user.role ?? 'BUYER').toLowerCase()}/dashboard`)
  redirect('/dashboard/seller')
}
