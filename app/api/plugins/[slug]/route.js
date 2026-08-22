export async function GET(request, { params }) {
  try {
    const { slug } = await params
    const res = await fetch(
      `${process.env.GOOGLE_SCRIPT_URL}?action=getPlugin&slug=${slug}`,
      { cache: 'no-store' }
    )
    const data = await res.json()
    return Response.json(data)
  } catch (error) {
    return Response.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

export async function POST(request, { params }) {
  try {
    const { slug } = await params
    const body = await request.json()

    const res = await fetch(process.env.GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: body.action,
        slug,
        ...body,
      }),
    })

    const data = await res.json()
    return Response.json(data)
  } catch (error) {
    return Response.json({ error: 'Something went wrong' }, { status: 500 })
  }
}