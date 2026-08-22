export async function POST(request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return Response.json({ error: 'All fields required' }, { status: 400 })
    }

    await fetch(process.env.GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'addEmail',
        email,
        plugin: `Contact: ${name} – ${message}`,
      }),
    })

    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: 'Something went wrong' }, { status: 500 })
  }
}