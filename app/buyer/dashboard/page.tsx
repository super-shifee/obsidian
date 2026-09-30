import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'

export default async function BuyerDashboardRoute() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in?redirect=/buyer/dashboard')
  if ((session.user.role ?? 'BUYER') !== 'BUYER') redirect(`/${(session.user.role ?? 'BUYER').toLowerCase()}/dashboard`)
  redirect('/dashboard/buyer')
}
