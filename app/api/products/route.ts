import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { products } from '@/lib/db/schema'
import { asc, ilike, or } from 'drizzle-orm'

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('q')?.trim() ?? ''
  const data = await db
    .select()
    .from(products)
    .where(query ? or(ilike(products.name, `%${query}%`), ilike(products.country, `%${query}%`), ilike(products.grade, `%${query}%`)) : undefined)
    .orderBy(asc(products.name))

  return NextResponse.json({ data, meta: { count: data.length, query } })
}
