import { NextResponse } from 'next/server'
import { demoProductRepository } from '@/lib/domain'

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('q') ?? ''
  const products = await demoProductRepository.list(query)
  return NextResponse.json({ data: products, meta: { count: products.length, query } })
}
