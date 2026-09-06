import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.json({ status: 'ok', service: 'black-sand-marketplace', persistence: 'mock-adapter' })
}
