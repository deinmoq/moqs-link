export async function GET() {
  try {
    const url = `${process.env.GOOGLE_SCRIPT_URL}?action=getPlugins`
    console.log('Fetching:', url)
    
    const res = await fetch(url, { cache: 'no-store' })
    const text = await res.text()
    console.log('Response:', text)
    
    const data = JSON.parse(text)
    return Response.json(data)
  } catch (error) {
    console.log('Error:', error.message)
    return Response.json({ error: error.message }, { status: 500 })
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
    return Response.json(data)
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}