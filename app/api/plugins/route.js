import { NextResponse } from "next/server"

export async function GET() {
  try {
    const res = await fetch(
      `${process.env.GOOGLE_SCRIPT_URL}?action=getPlugins`,
      { cache: 'no-store' }
    )
    const data = await res.json()
    return NextResponse.json({ plugins: data.plugins || [] })
  } catch (err) {
    return NextResponse.json({ error: "Failed to load plugins" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const res = await fetch(process.env.GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}