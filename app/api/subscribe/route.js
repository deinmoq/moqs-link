export async function POST(request) {
  try {
    const { email, pluginName } = await request.json()

    if (!email) {
      return Response.json({ error: 'Email required' }, { status: 400 })
    }

    await fetch(process.env.GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'addEmail',
        email,
        plugin: pluginName,
      }),
    })

    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: 'Something went wrong' }, { status: 500 })
  }
}