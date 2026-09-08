'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { products, requests, favorites } from '@/lib/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getProducts() {
  return db.select().from(products).orderBy(desc(products.createdAt))
}

export async function getProductBySlug(slug: string) {
  return db.query.products.findFirst({
    where: eq(products.slug, slug),
  })
}

export async function getFavoritesByUser() {
  const userId = await getUserId()
  return db.select().from(favorites).where(eq(favorites.buyerUserId, userId))
}

export async function toggleFavorite(productId: string) {
  const userId = await getUserId()

  const existing = await db.query.favorites.findFirst({
    where: and(eq(favorites.productId, productId), eq(favorites.buyerUserId, userId)),
  })

  if (existing) {
    await db.delete(favorites).where(
      and(eq(favorites.productId, productId), eq(favorites.buyerUserId, userId)),
    )
  } else {
    await db.insert(favorites).values({
      productId,
      buyerUserId: userId,
    })
  }

  revalidatePath('/dashboard/buyer')
}

export async function createQuoteRequest(
  productId: string,
  data: {
    quantity: number
    companyName?: string
    phone?: string
    country?: string
    message?: string
  },
) {
  const userId = await getUserId()
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user.email) throw new Error('Email required')

  const request = await db
    .insert(requests)
    .values({
      productId,
      buyerUserId: userId,
      buyerName: session.user.name || 'Unknown',
      email: session.user.email,
      companyName: data.companyName,
      phone: data.phone,
      country: data.country,
      requestedQuantity: data.quantity.toString(),
      message: data.message,
    })
    .returning()

  revalidatePath('/dashboard/buyer')
  return request[0]
}

export async function getQuoteRequests() {
  const userId = await getUserId()
  return db.query.requests.findMany({
    where: eq(requests.buyerUserId, userId),
    orderBy: desc(requests.createdAt),
  })
}

export async function getQuoteRequestById(id: string) {
  const userId = await getUserId()
  return db.query.requests.findFirst({
    where: and(eq(requests.id, id), eq(requests.buyerUserId, userId)),
  })
}
