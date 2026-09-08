'use server'

import { and, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { products, requests, users } from '@/lib/db/schema'

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  const allowedEmails = (process.env.ADMIN_EMAILS ?? '').split(',').map((email) => email.trim().toLowerCase()).filter(Boolean)
  if (!session?.user || !allowedEmails.includes(session.user.email.toLowerCase())) throw new Error('Unauthorized')
  return session.user
}

export async function getAdminOverview() {
  await requireAdmin()
  const [productRows, userRows, requestRows] = await Promise.all([
    db.select().from(products).orderBy(desc(products.updatedAt)),
    db.select({ id: users.id, name: users.name, email: users.email, createdAt: users.createdAt }).from(users).orderBy(desc(users.createdAt)),
    db.select({ request: requests, product: products }).from(requests).innerJoin(products, eq(requests.productId, products.id)).orderBy(desc(requests.createdAt)),
  ])
  return { products: productRows, users: userRows, requests: requestRows }
}

export async function updateAdminProduct(id: string, data: { name: string; price: number; quantity: number; availability: string; category: string }) {
  await requireAdmin()
  if (!data.name.trim() || !Number.isFinite(data.price) || data.price < 0 || !Number.isFinite(data.quantity) || data.quantity < 0) throw new Error('Enter valid product values')
  const updated = await db.update(products).set({ name: data.name.trim(), price: String(data.price), quantity: String(data.quantity), availability: data.availability, category: data.category.trim() || 'Black Sand', updatedAt: new Date() }).where(eq(products.id, id)).returning()
  if (!updated[0]) throw new Error('Product not found')
  revalidatePath('/admin')
  revalidatePath('/marketplace')
  revalidatePath(`/products/${updated[0].slug}`)
  return updated[0]
}

export async function deleteAdminProduct(id: string) {
  await requireAdmin()
  const deleted = await db.delete(products).where(eq(products.id, id)).returning({ id: products.id })
  if (!deleted[0]) throw new Error('Product not found')
  revalidatePath('/admin')
  revalidatePath('/marketplace')
}

export async function updateAdminRequest(id: string, status: string, sellerResponse?: string) {
  await requireAdmin()
  const updated = await db.update(requests).set({ status, sellerResponse: sellerResponse?.trim() || null, updatedAt: new Date() }).where(eq(requests.id, id)).returning()
  if (!updated[0]) throw new Error('Request not found')
  revalidatePath('/admin')
  return updated[0]
}

export async function isAdminUser() {
  try { await requireAdmin(); return true } catch { return false }
}
