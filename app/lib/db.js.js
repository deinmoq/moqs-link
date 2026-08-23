export async function getPlugins() {
  const res = await fetch(
    `${process.env.GOOGLE_SCRIPT_URL}?action=getPlugins`,
    { cache: 'no-store' }
  )
  const data = await res.json()
  return data.plugins || []
}