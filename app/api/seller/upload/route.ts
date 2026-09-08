import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await request.formData()
  const file = formData.get('file')
  if (!(file instanceof File)) return NextResponse.json({ error: 'File is required' }, { status: 400 })
  if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: 'File must be smaller than 10MB' }, { status: 400 })
  if (!file.type.startsWith('image/') && file.type !== 'application/pdf') return NextResponse.json({ error: 'Only images and PDFs are supported' }, { status: 400 })

  const blob = await put(`seller/${session.user.id}/${crypto.randomUUID()}-${file.name}`, file, { access: 'private', addRandomSuffix: false })
  return NextResponse.json({ pathname: blob.pathname })
}
