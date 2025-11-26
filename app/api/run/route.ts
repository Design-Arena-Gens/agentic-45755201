import { NextRequest, NextResponse } from 'next/server'
import { runPipeline } from '@/lib/orchestrator'

function normalizeRegion(input: any): 'US' | 'EU' | 'GLOBAL' {
  const val = String(input || 'US').toUpperCase()
  return (['US', 'EU', 'GLOBAL'].includes(val) ? val : 'US') as any
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const region = normalizeRegion(body?.region)
  try {
    const result = await runPipeline({ region })
    return NextResponse.json(result)
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unknown error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const region = normalizeRegion(searchParams.get('region'))
  try {
    const result = await runPipeline({ region })
    return NextResponse.json(result)
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unknown error' }, { status: 500 })
  }
}
