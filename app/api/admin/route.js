export async function GET() {
  try {
    const res = await fetch(
      `${process.env.GOOGLE_SCRIPT_URL}?action=getEmails`,
      { cache: 'no-store' }
    )
    const data = await res.json()
    return Response.json(data)
  } catch (error) {
    return Response.json({ error: 'Something went wrong' }, { status: 500 })
  }
}