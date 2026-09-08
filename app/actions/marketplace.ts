'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { products, requests, favorites, announcements, notifications } from '@/lib/db/schema'
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

export async function getSellerProducts() {
  const userId = await getUserId()
  return db.select().from(products).where(eq(products.sellerUserId, userId)).orderBy(desc(products.updatedAt))
}

export type SellerProductInput = {
  name: string
  slug: string
  category: string
  description: string
  quantity: number
  unit: string
  price: number
  currency?: string
  availability?: string
  mineralContent: string
  grade: string
  country: string
  region: string
  sellerName: string
  sellerCompany: string
  imageUrls?: string[]
  documentUrls?: string[]
}

function validateProduct(data: SellerProductInput) {
  if (!data.name.trim() || !data.slug.trim() || !data.description.trim()) throw new Error('Name, slug, and description are required')
  if (!Number.isFinite(data.quantity) || data.quantity < 0 || !Number.isFinite(data.price) || data.price < 0) throw new Error('Quantity and price must be valid non-negative numbers')
}

export async function createSellerProduct(data: SellerProductInput) {
  const userId = await getUserId()
  validateProduct(data)
  const created = await db.insert(products).values({
    ...data,
    quantity: String(data.quantity),
    price: String(data.price),
    currency: data.currency ?? 'USD',
    availability: data.availability ?? 'available',
    sellerUserId: userId,
    imageUrls: data.imageUrls ?? [],
    documentUrls: data.documentUrls ?? [],
  }).returning()
  revalidatePath('/dashboard/seller')
  revalidatePath('/marketplace')
  return created[0]
}

export async function getSellerRequests() {
  const userId = await getUserId()
  return db
    .select({ request: requests, product: products })
    .from(requests)
    .innerJoin(products, eq(requests.productId, products.id))
    .where(eq(products.sellerUserId, userId))
    .orderBy(desc(requests.createdAt))
}

export async function deleteSellerProduct(id: string) {
  const userId = await getUserId()
  const deleted = await db.delete(products).where(and(eq(products.id, id), eq(products.sellerUserId, userId))).returning({ id: products.id })
  if (!deleted[0]) throw new Error('Product not found')
  revalidatePath('/dashboard/seller')
  revalidatePath('/marketplace')
}

export async function setProductAvailability(id: string, availability: string) {
  const userId = await getUserId()
  const updated = await db.update(products).set({ availability, updatedAt: new Date() }).where(and(eq(products.id, id), eq(products.sellerUserId, userId))).returning()
  if (!updated[0]) throw new Error('Product not found')
  revalidatePath('/dashboard/seller')
  revalidatePath('/marketplace')
  return updated[0]
}

export async function getSellerAnnouncements() {
  const userId = await getUserId()
  return db.select().from(announcements).where(eq(announcements.sellerUserId, userId)).orderBy(desc(announcements.createdAt))
}

export async function createSellerAnnouncement(data: { title: string; message: string }) {
  const userId = await getUserId()
  if (!data.title.trim() || !data.message.trim()) throw new Error('Title and message are required')
  const created = await db.insert(announcements).values({ sellerUserId: userId, title: data.title.trim(), message: data.message.trim() }).returning()
  revalidatePath('/dashboard/seller')
  return created[0]
}

export async function getBuyerNotifications() {
  const userId = await getUserId()
  return db.select().from(notifications).where(eq(notifications.buyerUserId, userId)).orderBy(desc(notifications.createdAt))
}

export async function getSellerProduct(id: string) {
  const userId = await getUserId()
  return db.query.products.findFirst({ where: and(eq(products.id, id), eq(products.sellerUserId, userId)) })
}

export async function updateSellerProduct(id: string, data: Partial<SellerProductInput>) {
  const userId = await getUserId()
  const { quantity, price, ...textFields } = data
  const updated = await db.update(products).set({
    ...textFields,
    ...(quantity !== undefined ? { quantity: String(quantity) } : {}),
    ...(price !== undefined ? { price: String(price) } : {}),
    updatedAt: new Date(),
  }).where(and(eq(products.id, id), eq(products.sellerUserId, userId))).returning()
  if (!updated[0]) throw new Error('Product not found')
  revalidatePath('/dashboard/seller')
  revalidatePath('/marketplace')
  return updated[0]
}
